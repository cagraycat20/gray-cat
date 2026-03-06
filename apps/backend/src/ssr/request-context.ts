import * as React from 'react';

export interface SsrRequest {
  isDesktop: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isSmartTv: boolean;
  country: string;
}

const RequestContext = React.createContext<SsrRequest>(headersToRequest({}));

export function headersToRequest(headers: { [name: string]: string }): SsrRequest {
  return {
    isDesktop: headers['CloudFront-Is-Desktop-Viewer'] === 'true',
    isMobile: headers['CloudFront-Is-Mobile-Viewer'] === 'true',
    isTablet: headers['CloudFront-Is-SmartTV-Viewer'] === 'true',
    isSmartTv: headers['CloudFront-Is-Tablet-Viewer'] === 'true',
    country: headers['CloudFront-Viewer-Country'],
  };
}

export const RequestProvider = RequestContext.Provider;
export const RequestConsumer = RequestContext.Consumer;
