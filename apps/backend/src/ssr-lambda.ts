import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import * as React from 'react';
import { pagePath as pp } from './constants';
import { createHandler } from './lib/lambda-handler';
import { loadProductListPageData, loadProductPageData } from './lib/ssr.utils';
import { renderStaticPage } from './ssr';
import { GcDangerPage } from './ssr/articles/gc-danger-page/gc-danger-page.view';
import { GcHowNotToGiveUpPage } from './ssr/articles/gc-how-not-to-giveup-page/gc-how-not-to-giveup-page.view';
import { GcPointlessCalculationsPage } from './ssr/articles/gc-pointless-calculations-page/gc-pointless-calculations-page.view';
import { GcRealStrategyPage } from './ssr/articles/gc-real-strategy-page/gc-real-strategy-page.view';
import { GcCookiePolicyPage, GcPrivacyPolicyPage, GcTermsOfUsePage } from './ssr/gc-docs';
import { GcPageNotFound } from './ssr/gc-page-not-found/gc-page-not-found.view';
import { GcProductListPage } from './ssr/gc-product-list-page/gc-product-list-page.view';
import { GcProductPage } from './ssr/gc-product-page/gc-product-page.view';
import { GcWelcome } from './ssr/gc-welcome-page/gc-welcome-page.view';
import { ConsumedProductsSummarySocialPage, SocialPage } from './types';

const pages: Array<[string, React.ComponentType]> = [
  [pp.welcome, GcWelcome],
  [pp.pointlessCalculations, GcPointlessCalculationsPage],
  [pp.realStrategy, GcRealStrategyPage],
  [pp.danger, GcDangerPage],
  [pp.howNotToGiveUp, GcHowNotToGiveUpPage],
  [pp.cookies, GcCookiePolicyPage],
  [pp.terms, GcTermsOfUsePage],
  [pp.privacy, GcPrivacyPolicyPage],
];

export const socialHandler = createHandler<SocialPage>(
  { required: true },
  {
    post: async () => {
      return '';
    },
  },
);

export const consumedProductsSummarySocialHandler =
  createHandler<ConsumedProductsSummarySocialPage>(
    { required: true },
    {
      post: async () => {
        return '';
      },
    },
  );

async function renderPage(path: string, event: APIGatewayProxyEvent): Promise<string> {
  const page = pages.find(([pagePath]) => pagePath === path);
  if (page) {
    const PageComponent = page[1];
    return renderStaticPage(PageComponent, event.headers, {});
  }

  const productMatch = /^food\/(\S+)/.exec(path);
  if (productMatch) {
    const productData = await loadProductPageData(productMatch[1]);
    if (productData) {
      return renderStaticPage(GcProductPage, event.headers, {
        productData,
      });
    }
  }

  if (/^food\/?$/.test(path)) {
    const productListData = await loadProductListPageData(event.queryStringParameters || {});

    return renderStaticPage(GcProductListPage, event.headers, {
      productListData,
    });
  }

  return renderStaticPage(GcPageNotFound, event.headers, {});
}

export const ssrHandler: APIGatewayProxyHandler = async (event) => {
  const headers = {
    'Content-Type': 'text/html;charset=utf-8',
  };

  try {
    const path = event.pathParameters || {};
    const proxyPath = path.proxy ? decodeURIComponent(path.proxy.toLocaleLowerCase()) : '';

    if (proxyPath === 'echo-realy-secret-path') {
      return {
        statusCode: 200,
        body: JSON.stringify(event),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      };
    }

    if (proxyPath === '.well-known/assetlinks.json') {
      return {
        statusCode: 200,
        body: JSON.stringify([
          {
            relation: ['delegate_permission/common.handle_all_urls'],
            target: {
              namespace: 'android_app',
              package_name: 'com.graycat.protomeal',
              // tslint:disable-next-line: max-line-length
              sha256_cert_fingerprints: [
                '21:39:66:28:F2:65:B8:64:82:B7:DA:A1:1F:D4:2F:8E:28:D1:9C:A6:47:2C:21:E6:97:2E:7C:F0:81:AD:EE:06', // prod
                'E7:0D:8C:B7:65:69:86:95:31:41:40:E6:97:2C:6A:42:D6:D1:BD:7E:F7:D5:C4:F7:B3:F3:33:1F:45:E7:23:B9', // test
              ],
            },
          },
        ]),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      };
    }

    if (proxyPath === 'favicon.ico') {
      return {
        statusCode: 301,
        body: '',
        headers: {
          Location: '/app/favicon.ico',
        },
      };
    }

    return {
      statusCode: 200,
      body: await renderPage(proxyPath, event),
      headers,
    };
  } catch (error) {
    let statusCode;
    let message;
    let stack;

    if (typeof error === 'string') {
      message = error;
    } else {
      ({ message, stack, statusCode } = error);
    }

    statusCode = statusCode || 500;

    // tslint:disable-next-line:no-console
    console.error('Error:', statusCode, message, stack);
    // tslint:disable-next-line:no-console
    console.log('Event:', event);

    return {
      statusCode,
      body: message,
      headers,
    };
  }
};
