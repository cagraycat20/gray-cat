// @ts-ignore
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import rsaJwkToBuffer from 'jwk-to-pem/src/rsa';

import { config } from './config';
import { db } from './db-client';
import { getUser, HttpError } from './util';

const jwtOptions = {
  algorithms: ['RS256'],
  audience: config.cognito.clientId,
  issuer: config.cognito.issuer,
};

type GetKey = (header: {kid: string}, callback: (error: string | null, result?: string | null) => void) => void;

const getKey: GetKey = (header, callback) => {
  const jwk = config.cognito.jwks.keys.find((key) => key.kid === header.kid);

  if (jwk) {
    callback(null, rsaJwkToBuffer(jwk, {}));
  } else {
    callback('JWK not found');
  }
};

// tslint:disable-next-line: no-any
function verifyToken(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      // tslint:disable-next-line: no-any
      jwt.verify(token, getKey, jwtOptions, (err: any, decoded: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

export interface AuthConfig {
  required?: boolean;
  adminOnly?: boolean;
  substituteAdminUser?: boolean;
}

export interface AuthUser {
  userId: string;
  isAdmin: boolean;
}

export async function auth(authHeader: string, authConfig: AuthConfig): Promise<AuthUser> {
  const [scheme, token] = authHeader.split(' ');

  let userId = '';
  let isAdmin = false;

  if (!/^Bearer$/i.test(scheme) || !token) {
    if (authConfig.required) {
      throw new HttpError(401, 'Unauthorized');
    } else {
      return {userId, isAdmin};
    }
  }

  const payload = await verifyToken(token);

  if (payload && payload.email) {
    userId = payload.email;
  }

  if (!userId && (authConfig.required || authConfig.adminOnly)) {
    throw new HttpError(401, 'Unauthorized');
  }

  const user = userId ? await getUser(db, {userId}) : null;
  isAdmin = !!user && user.isAdmin;

  if (authConfig.adminOnly && (!user || !user.isAdmin)) {
    throw new HttpError(403, 'Forbidden');
  }

  if (isAdmin && authConfig.substituteAdminUser) {
    userId = config.rootUserName;
  }

  return {userId, isAdmin};
}
