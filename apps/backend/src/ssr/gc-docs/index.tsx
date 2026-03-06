import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { siteEmail, siteName, siteUrl } from '../../../../web-ui/src/shared';
import { GcPage } from '../shared/gc-page/gc-page.view';
import { GcCookiePolicy } from './gc-cookie-policy';
import { StyleProps, stylesCallback } from './gc-docs.style';
import { GcPrivacyPolicy } from './gc-privacy-policy';
import { GcTermsOfUse } from './gc-terms-of-use';

export const GcTermsOfUsePage = withStyles(stylesCallback)(({classes}: StyleProps) => (
  <GcPage
    title={`${siteName} - Terms of Use`}
    content={
      <div className={classes.root}>
        <GcTermsOfUse
          siteEmail={siteEmail}
          siteUrl={siteUrl}
          siteName={siteName}
        />
      </div>}
  />
));

export const GcCookiePolicyPage = withStyles(stylesCallback)(({classes}: StyleProps) => (
  <GcPage
    title={`${siteName} - Cookie Policy`}
    content={
      <div className={classes.root}>
        <GcCookiePolicy
          siteEmail={siteEmail}
          siteUrl={siteUrl}
          siteName={siteName}
        />
      </div>}
  />
));

export const GcPrivacyPolicyPage = withStyles(stylesCallback)(({classes}: StyleProps) => (
  <GcPage
    title={`${siteName} - Privacy Policy`}
    content={
      <div className={classes.root}>
        <GcPrivacyPolicy
          siteEmail={siteEmail}
          siteUrl={siteUrl}
          siteName={siteName}
        />
      </div>}
  />
));
