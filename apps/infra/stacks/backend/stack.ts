import { CfnOutput, Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as authorizers from 'aws-cdk-lib/aws-apigatewayv2-authorizers';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as path from 'path';
import { GcEnvironment } from 'stacks/shared/environments';
import { BACKEND_CONFIG } from './config';

enum ApiRoute {
  GetProducts = 'get-products',
  GetUserData = 'get-user-data',
  Sync = 'sync',
}

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const removalPolicy =
      BACKEND_CONFIG.ENVIRONMENT === GcEnvironment.Prod
        ? RemovalPolicy.RETAIN
        : RemovalPolicy.DESTROY;

    /* ----------------------- DynamoDB tables ----------------------- */

    const productTable = new dynamodb.Table(this, 'ProductsTable', {
      tableName: getTableName('products'),
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy,
    });

    const userDataTable = new dynamodb.Table(this, 'UserDataTable', {
      tableName: getTableName('user-data'),
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy,
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

    const getProductsLambda = getLambda(this, 'getProducts');
    const getUserDataLambda = getLambda(this, 'getUserData');
    const syncChangesLambda = getLambda(this, 'syncChanges');

    productTable.grantReadWriteData(getProductsLambda);
    productTable.grantReadWriteData(syncChangesLambda);
    userDataTable.grantReadData(getUserDataLambda);
    userDataTable.grantReadWriteData(syncChangesLambda);

    /* ----------------------- HTTP API + Auth ----------------------- */

    const httpApi = new apigwv2.HttpApi(this, 'HttpApi', {
      apiName: 'main-api',
      corsPreflight: {
        allowHeaders: ['authorization', 'content-type'],
        allowMethods: [
          apigwv2.CorsHttpMethod.GET,
          apigwv2.CorsHttpMethod.POST,
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
      path: `/${ApiRoute.GetUserData}`,
      methods: [apigwv2.HttpMethod.GET],
      integration: new integrations.HttpLambdaIntegration(
        'GetUserDataIntegration',
        getUserDataLambda,
      ),
      authorizer,
    });

    httpApi.addRoutes({
      path: `/${ApiRoute.GetProducts}`,
      methods: [apigwv2.HttpMethod.GET],
      integration: new integrations.HttpLambdaIntegration(
        'GetProductsIntegration',
        getProductsLambda,
      ),
      authorizer,
    });

    httpApi.addRoutes({
      path: `/${ApiRoute.Sync}`,
      methods: [apigwv2.HttpMethod.POST],
      integration: new integrations.HttpLambdaIntegration(
        'SyncChangesIntegration',
        syncChangesLambda,
      ),
      authorizer,
    });

    /* ----------------------- Outputs ----------------------- */

    new CfnOutput(this, 'HttpApiUrl', { value: httpApi.apiEndpoint });
    new CfnOutput(this, 'UserPoolId', { value: userPool.userPoolId });
    new CfnOutput(this, 'UserPoolClientId', { value: userPoolClient.userPoolClientId });
    new CfnOutput(this, 'DataTableName', { value: productTable.tableName });
    new CfnOutput(this, 'MetaTableName', { value: userDataTable.tableName });
  }
}

function getTableName(name: string): string {
  return [BACKEND_CONFIG.ENVIRONMENT, name].join('.');
}

function getLambda(context: Construct, name: string): lambda.Function {
  return new NodejsFunction(context, name, {
    entry: path.join(__dirname, `../../apps/backend/src/handlers/${name}.ts`),
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
