import { CfnOutput, Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as authorizers from 'aws-cdk-lib/aws-apigatewayv2-authorizers';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import * as path from 'path';
import { GC_CONFIG } from 'stacks/shared/config';
import { GcEnvironment } from 'stacks/shared/environments';

enum ApiRoute {
  UserSettings = 'userSettings',
  Products = 'products',
  ImageSearch = 'imageSearch',
  Days = 'days',
}

export class BackendStack extends Stack {
  private productTable: dynamodb.Table;
  private daysTable: dynamodb.Table;
  private usersTable: dynamodb.Table;
  private systemTable: dynamodb.Table;

  private mediaBucket: s3.Bucket;
  private userContentBucket: s3.Bucket;
  private assetsBucket: s3.Bucket;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const removalPolicy =
      GC_CONFIG.ENVIRONMENT === GcEnvironment.Prod ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY;

    /* ----------------------- DynamoDB tables ----------------------- */

    this.productTable = new dynamodb.Table(this, 'ProductsTable', {
      tableName: getTableName(GC_CONFIG.PRODUCTS_TABLE_NAME),
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy,
    });

    this.daysTable = new dynamodb.Table(this, 'DaysTable', {
      tableName: getTableName(GC_CONFIG.DAYS_TABLE_NAME),
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'date', type: dynamodb.AttributeType.NUMBER },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy,
    });

    this.usersTable = new dynamodb.Table(this, 'UsersTable', {
      tableName: getTableName(GC_CONFIG.USERS_TABLE_NAME),
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy,
    });

    this.systemTable = new dynamodb.Table(this, 'SystemTable', {
      tableName: getTableName(GC_CONFIG.SYSTEM_TABLE_NAME),
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy,
    });

    /* ----------------------- Buckets ----------------------- */

    const stackName = Stack.of(this).stackName;

    this.mediaBucket = new s3.Bucket(this, 'MediaBucket', {
      bucketName: this.getBucketName(GC_CONFIG.MEDIA_BUCKET_NAME),
      removalPolicy: RemovalPolicy.RETAIN,
    });

    this.userContentBucket = new s3.Bucket(this, 'UserContentS3Bucket', {
      bucketName: this.getBucketName(GC_CONFIG.USER_CONTENT_BUCKET_NAME),
      removalPolicy: RemovalPolicy.RETAIN,
    });

    this.assetsBucket = new s3.Bucket(this, 'assetsS3Bucket', {
      bucketName: this.getBucketName(GC_CONFIG.ASSETS_BUCKET_NAME),
      removalPolicy: RemovalPolicy.RETAIN,
    });

    /* ----------------------- Cognito ----------------------- */

    const userPool = new cognito.UserPool(this, 'UserPool', {
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      passwordPolicy: { minLength: 8, requireLowercase: true, requireDigits: true },
      removalPolicy,
    });

    const userPoolClient = new cognito.UserPoolClient(this, 'UserPoolClient', {
      userPool,
      authFlows: { userPassword: true, userSrp: true },
      preventUserExistenceErrors: true,
      generateSecret: false,
    });

    /* ----------------------- Lambdas ----------------------- */

    const userSettingsLambda = this.getLambda('user-settings-lambda');
    const productsLambda = this.getLambda('products-lambda');
    const imageSearchLambda = this.getLambda('image-search-lambda');
    const daysLambda = this.getLambda('days-lambda');

    /* ----------------------- HTTP API + Auth ----------------------- */

    const httpApi = new apigwv2.HttpApi(this, 'HttpApi', {
      apiName: 'main-api',
      corsPreflight: {
        allowHeaders: ['authorization', 'content-type'],
        allowMethods: [
          apigwv2.CorsHttpMethod.GET,
          apigwv2.CorsHttpMethod.POST,
          apigwv2.CorsHttpMethod.PUT,
          apigwv2.CorsHttpMethod.DELETE,
          apigwv2.CorsHttpMethod.OPTIONS,
        ],
        allowOrigins: ['*'], // TODO: tighten for prod
        maxAge: Duration.days(10),
      },
    });

    const authorizer = new authorizers.HttpUserPoolAuthorizer('CognitoAuthorizer', userPool, {
      userPoolClients: [userPoolClient],
    });

    httpApi.addRoutes({
      path: `/${ApiRoute.UserSettings}`,
      methods: [apigwv2.HttpMethod.POST],
      integration: new integrations.HttpLambdaIntegration(
        'GetUserSettingsIntegration',
        userSettingsLambda,
      ),
      authorizer,
    });

    httpApi.addRoutes({
      path: `/${ApiRoute.Products}`,
      methods: [apigwv2.HttpMethod.GET, apigwv2.HttpMethod.POST, apigwv2.HttpMethod.DELETE],
      integration: new integrations.HttpLambdaIntegration('ProductsIntegration', productsLambda),
      authorizer,
    });

    httpApi.addRoutes({
      path: `/${ApiRoute.ImageSearch}`,
      methods: [apigwv2.HttpMethod.GET],
      integration: new integrations.HttpLambdaIntegration(
        'ImageSearchIntegration',
        imageSearchLambda,
      ),
      authorizer,
    });

    httpApi.addRoutes({
      path: `/${ApiRoute.Days}`,
      methods: [apigwv2.HttpMethod.GET, apigwv2.HttpMethod.PUT],
      integration: new integrations.HttpLambdaIntegration('DaysIntegration', daysLambda),
      authorizer,
    });

    /* ----------------------- Outputs ----------------------- */

    new CfnOutput(this, 'HttpApiUrl', { value: httpApi.apiEndpoint });
    new CfnOutput(this, 'UserPoolId', { value: userPool.userPoolId });
    new CfnOutput(this, 'UserPoolClientId', { value: userPoolClient.userPoolClientId });
  }

  private getLambda(name: string): lambda.Function {
    const fullLambdaName = getFullLambdaName(Stack.of(this).stackName, name);

    return new lambda.Function(this, name, {
      functionName: fullLambdaName,
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: `${name}.handler`,
      code: lambda.Code.fromAsset(getPathToLambda(name)),
      memorySize: 256,
      timeout: Duration.seconds(30),
      environment: {
        USERS_TABLE: this.usersTable.tableName,
        DAYS_TABLE: this.daysTable.tableName,
        PRODUCTS_TABLE: this.productTable.tableName,
        SYSTEM_TABLE: this.systemTable.tableName,
        MEDIA_BUCKET: this.mediaBucket.bucketName,
      },
    });
  }

  private getBucketName(name: string): string {
    return [Stack.of(this).stackName, GC_CONFIG.ENVIRONMENT, name].join('.');
  }
}

function getTableName(name: string): string {
  return [GC_CONFIG.ENVIRONMENT, name].join('.');
}

const MAX_LAMBDA_NAME_SIZE = 64;

function getFullLambdaName(stackName: string, lambdaName: string): string {
  return [stackName, lambdaName.replace('lambda-', '')]
    .join('-') // we want to properly separate stack name
    .split('-') // now all words are separated with "-"
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('')
    .slice(0, MAX_LAMBDA_NAME_SIZE - 1);
}

function getPathToLambda(name: string): string {
  return path.join(__dirname, `../../../backend/build/${name}`);
}
