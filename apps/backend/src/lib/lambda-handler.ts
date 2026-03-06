import { APIGatewayProxyHandler } from 'aws-lambda';
import { auth, AuthConfig } from './auth';
import { HttpError } from './util';

export interface LambdaRequest<T> {
  userId: string;
  isAdmin: boolean;
  path: { [name: string]: string | undefined };
  query: { [name: string]: string  | undefined };
  body?: T;
}

export type RestHandler<T, U> = (req: LambdaRequest<T>) => Promise<U>;

export interface RestHandlers<T, U> {
  /** GET / - List all entities */
  get?: RestHandler<undefined, U|Array<U>>;

  /** POST / - Create a new entity */
  post?: RestHandler<T, U>;

  /** PUT / - Create/update several entities */
  put?: RestHandler<Array<T>, Array<U>>;

  /** DELETE / - Delete a given entity */
  delete?: RestHandler<T, U>;
}

type RestHandlersKey = keyof RestHandlers<{}, {}>;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

const isProd = process.env.STAGE === 'prod';

export function createHandler<T, U = T>(authConfig: AuthConfig, handlers: RestHandlers<T, U>): APIGatewayProxyHandler {
  return async (event) => {
    let sendDetails = !isProd;
    try {
      const handler = handlers[event.httpMethod.toLowerCase() as RestHandlersKey] as RestHandler<T, U>;
      if (!handler) {
        throw new HttpError(404, 'Not Found');
      }

      const authHeader = event.headers.Authorization || event.headers.authorization || '';

      const {userId, isAdmin} = await auth(authHeader, authConfig);
      sendDetails = sendDetails || isAdmin;
      const result = await handler({
        userId,
        isAdmin,
        path: event.pathParameters || {},
        query: event.queryStringParameters || {},
        body: event.body ? JSON.parse(event.body) : undefined,
      });

      const resultIsString = typeof result === 'string';

      return  {
        statusCode: 200,
        body: resultIsString ? String(result) : JSON.stringify(result),
        headers: {
          'Content-Type': `${resultIsString ? 'text/html' : 'application/json'};charset=utf-8`,
          ...headers,
        },
      };

    } catch (error) {
      let statusCode;
      let message;
      let stack;

      if (typeof error === 'string') {
        message = error;
      } else {
        ({message, stack, statusCode} = error);
      }

      statusCode = statusCode || 500;

      // tslint:disable-next-line:no-console
      console.error('Error:', statusCode, message, stack);
      // tslint:disable-next-line:no-console
      console.log('Event:', event);

      return {
        statusCode,
        body: JSON.stringify({
          message,
          stack: sendDetails ? stack : undefined,
          event: sendDetails ? event : undefined,
        }),
        headers,
      };
    }
  };
}
