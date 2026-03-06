import {
  createGenerateClassName,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles';
import { SheetsRegistry } from 'jss';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Helmet from 'react-helmet';
import JssProvider from 'react-jss/lib/JssProvider';

import { APIGatewayProxyEvent } from 'aws-lambda';
import {
  styleCallback,
  theme,
} from '../../../web-ui/src/shared';
import { headersToRequest, RequestProvider } from './request-context';

export function renderStaticPage<P = {}>(
  Component: React.ComponentType<P>, headers: APIGatewayProxyEvent['headers'], props: P,
): string {
  const sheetsRegistry = new SheetsRegistry();
  const sheetsManager = new Map();
  const generateClassName = createGenerateClassName();

  // we need to inject global styles
  const StyleComponent = withStyles(styleCallback)(() => <Component {...props}/>);

  const content = renderToStaticMarkup(
    <>
      <Helmet>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta name="theme-color" content="#1E88E5"/>
      </Helmet>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <RequestProvider value={headersToRequest(headers)}>
            <StyleComponent {...props}/>
          </RequestProvider>
        </MuiThemeProvider>
      </JssProvider>
    </>,
  );

  const googleAnalytics =
    `<!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-133303976-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-133303976-1');
    </script>`;

  const helmet = Helmet.renderStatic(); // place after renderToStaticMarkup!
  return `<!doctype html><html ${helmet.htmlAttributes.toString()}>` +
    `<head>${googleAnalytics}${helmet.title.toString()}` +
    `${helmet.meta.toString()}${helmet.link.toString()}` +
    `<style>${sheetsRegistry.toString()}</style></head>` +
    `<body ${helmet.bodyAttributes.toString()}>${content}` +
    `${helmet.script.toString()}</body></html>`;
}
