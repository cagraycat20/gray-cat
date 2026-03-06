import { CfnOutput, Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as authorizers from 'aws-cdk-lib/aws-apigatewayv2-authorizers';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import s3 from 'aws-cdk-lib/aws-s3';
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
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const removalPolicy =
      GC_CONFIG.ENVIRONMENT === GcEnvironment.Prod ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY;

    /* ----------------------- DynamoDB tables ----------------------- */

    const productTable = new dynamodb.Table(this, 'ProductsTable', {
      tableName: getTableName('products'),
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy,
    });

    const daysTable = new dynamodb.Table(this, 'DaysTable', {
      tableName: getTableName('days'),
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'date', type: dynamodb.AttributeType.NUMBER },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy,
    });

    const usersTable = new dynamodb.Table(this, 'UsersTable', {
      tableName: getTableName('users'),
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy,
    });

    const systemTable = new dynamodb.Table(this, 'SystemTable', {
      tableName: getTableName('system'),
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy,
    });

    /* ----------------------- Buckets ----------------------- */

    const mediaBucket = new s3.Bucket(this, 'MediaBucket', {
      bucketName: GC_CONFIG.MEDIA_BUCKET_NAME,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    const userContentBucket = new s3.Bucket(this, 'UserContentS3Bucket', {
      bucketName: GC_CONFIG.USER_CONTENT_BUCKET_NAME,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    const assetsBucket = new s3.Bucket(this, 'assetsS3Bucket', {
      bucketName: GC_CONFIG.ASSETS_BUCKET_NAME,
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

    const userSettingsLambda = getLambda(this, 'user-settings-lambda');
    const productsLambda = getLambda(this, 'products-lambda');
    const imageSearchLambda = getLambda(this, 'image-search-lambda');
    const daysLambda = getLambda(this, 'days-lambda');

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
}

function getTableName(name: string): string {
  return [GC_CONFIG.ENVIRONMENT, name].join('.');
}

function getLambda(context: Construct, name: string): lambda.Function {
  return new NodejsFunction(context, name, {
    entry: path.join(__dirname, `../../backend/src/${name}.ts`),
    handler: 'handler',
    runtime: lambda.Runtime.NODEJS_22_X,
    memorySize: 256,
    timeout: Duration.seconds(30),
    bundling: {
      minify: true,
      sourceMap: true,
      target: 'es2022',
      externalModules: ['aws-sdk'],
    },
    environment: {},
  });
}
