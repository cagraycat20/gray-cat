import URLSearchParams from '@ungap/url-search-params';

import { removeReduxState } from '../utils/local-storage.utils';
import { logError } from '../utils/log.utils';

export interface IdTokenPayload {
  email?: string;
  exp: number;
  name?: string;
  picture?: string;
}

interface OAuth2TokenResponse {
  error?: string;
  id_token?: string;
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
}

class Auth {
  public name = '';
  public picture = '';
  public email = '';
  public authorized = false;

  private config = {
    clientId: '2qnn7ct7m50u2fekrj42711jqs',
    domain : 'auth.protomeal.com',
    redirectLogin : 'loggedIn',
    redirectLogout : 'loggedOut',
    responseType: 'code',
  };
  private token = '';
  private exp = 0;

  private baseUrl = (process.env.PUBLIC_URL || process.env.REACT_APP_DEV_URL || '').replace(/\/$/, '') + '/';

  constructor() {
    this.initFromStorage();

    const {href} = window.location;

    switch (true) {
      case href.startsWith(this.getLoginRedirect()):
        const code = (new URLSearchParams(window.location.search)).get('code') || '';
        this.getTokensFromCode(code).then((payload) => {
          if (payload.error) {
            throw new Error(payload.error);
          } else {
            this.saveToStorage(payload);
          }
          this.redirectToBase();
        });
        break;

      case href.startsWith(this.getLogoutRedirect()):
        removeReduxState(this.email);
        this.clearStorage();
        this.redirectToBase();
        break;
    }
  }

  public login = () => {
    window.location.assign(this.getLoginUrl());
  }

  public logout = () => {
    window.location.assign(this.getLogoutUrl());
  }

  public getToken = async () => {
    if (!this.token) {
      return '';
    }

    if (Date.now() < this.exp * 1000) {
      return this.token;
    } else {
      const refreshToken = localStorage.getItem('auth_refresh_token');

      if (refreshToken) {
        try {
          const payload = await this.getRefreshedTokens(refreshToken);
          if (!payload.error) {
            this.saveToStorage(payload);
          } else {
            logError(payload.error);
            this.clearStorage();
            this.login();
          }
        } catch (e) {
          // In case of network problems, we just skip until next time
          logError(e);
          return this.token;
        }
      } else {
        this.clearStorage();
      }
      this.initFromStorage();
      return this.token;
    }
  }

  private initFromStorage = () => {
    this.name = '';
    this.picture = '';
    this.exp = 0;
    this.authorized = false;
    this.token = localStorage.getItem('auth_id_token') || '';

    try {
      if (this.token) {
        const {name, picture, exp, email} = this.getTokenPayload(this.token);
        this.name = name || '';
        this.picture = picture || '';
        this.email = email || '';
        this.exp = exp;
        this.authorized = true;

        if (this.picture && this.picture.startsWith('{')) {
          // facebook picture is an object
          try {
            const picInfo = JSON.parse(this.picture);
            if (picInfo && picInfo.data) {
              this.picture =  picInfo.data.url;
            }
          } catch (e) {
            // just ignore exception
            this.picture = '';
          }
        }
      }
    } catch (e) {
      logError(e);
      this.token = '';
    }
  }

  private saveToStorage = ({id_token, refresh_token}: OAuth2TokenResponse) => {
    localStorage.setItem('auth_id_token', id_token || '');
    // we have refresh token only after login request
    if (refresh_token) {
      localStorage.setItem('auth_refresh_token', refresh_token);
    }
  }

  private clearStorage = () => {
    localStorage.setItem('auth_id_token', '');
    localStorage.setItem('auth_refresh_token', '');
  }

  private getAuthUrl = (path: string, params: object) => {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach((key) => searchParams.set(key, params[key]));
    return `https://${this.config.domain}/${path}?${searchParams.toString()}`;
  }

  private getLoginRedirect = () => this.baseUrl + this.config.redirectLogin;

  private getLogoutRedirect = () => this.baseUrl + this.config.redirectLogout;

  private getLoginUrl = () => this.getAuthUrl('login', {
    client_id: this.config.clientId,
    redirect_uri: this.getLoginRedirect(),
    response_type: this.config.responseType,
  })

  private getLogoutUrl = () => this.getAuthUrl('logout', {
    client_id: this.config.clientId,
    logout_uri: this.getLogoutRedirect(),
  })

  private getTokenPayload: (token: string) => IdTokenPayload =
    (token) => {
      const payloadPart = token.split('.')[1];
      if (payloadPart) {
        return JSON.parse(window.atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/')));
      } else {
        throw new Error('Invalid token');
      }
  }

  private fetchUrlEncoded = (path: string, params: object): Promise<Response> => {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach((key) => searchParams.set(key, params[key]));

    return fetch(`https://${this.config.domain}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: searchParams,
    });
  }

  private getTokensFromCode: (code: string) => Promise<OAuth2TokenResponse> = (code) =>
    this.fetchUrlEncoded(`oauth2/token`, {
      grant_type: 'authorization_code',
      client_id: this.config.clientId,
      redirect_uri: this.getLoginRedirect(),
      code,
    }).then((response) => response.json())

  private getRefreshedTokens: (refreshToken: string) => Promise<OAuth2TokenResponse> = (refreshToken) =>
    this.fetchUrlEncoded(`oauth2/token`, {
      grant_type: 'refresh_token',
      client_id: this.config.clientId,
      redirect_uri: this.getLoginRedirect(),
      refresh_token: refreshToken,
    }).then((response) => response.json())

  private redirectToBase = () => window.location.replace(this.baseUrl);
}

const auth = new Auth();

export default auth;
