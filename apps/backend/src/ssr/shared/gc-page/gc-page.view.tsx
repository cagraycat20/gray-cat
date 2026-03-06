import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/HomeRounded';
import PlayIcon from '@material-ui/icons/PlayArrowRounded';
import * as React from 'react';
import Helmet from 'react-helmet';
import { dateUtils, pagePath, siteEmail, siteName } from '../../../../../web-ui/src/shared';
import { fullLogo } from '../../assets';
import { GcDiscus } from '../../gc-discus/gc-discus.view';
import { StyleProps, stylesCallback } from './gc-page.style';

export interface UtilsTags {
  listNum: (text: string | number) => React.ReactNode;
}

type ContentCallback = (classes: StyleProps['classes'], utilsTags: UtilsTags) => React.ReactNode;

interface Props {
  content: ContentCallback | React.ReactNode;
  hideHomeButton?: boolean;
  discusId?: string;
  title: string;
}

function renderHeader(classes: StyleProps['classes']) {
  return (
    <div className={classes.header}>
      <div className={classes.headerContent}>
        <a href="/">
          <img
            className={classes.logo}
            src={fullLogo}
            alt="protomeal"
          />
        </a>
        <Button
          href="/app/"
          variant="contained"
          className={classes.appButton}
        >
          <PlayIcon className={classes.appButtonIcon} />
          <div className={classes.appButtonText}>TRY RIGHT NOW</div>
          <div className={classes.appButtonTextMobile}>TRY NOW</div>
        </Button>
      </div>
    </div>
  );
}

function renderContent(
  classes: StyleProps['classes'],
  content: Props['content'],
  hideHomeButton?: boolean,
) {
  const utilTags: UtilsTags = {
    listNum: (text) => <b className={classes.listNumber}>{text}</b>,
  };
  return (
    <div className={classes.contentContainer}>
      <div className={classes.content}>
        {
          typeof content === 'function'
            ? (content as ContentCallback)(classes, utilTags)
            : content
        }
      </div>
      {
        !hideHomeButton &&
        <Button
          href="/"
          variant="contained"
          className={classes.goToMainPageButton}
        >
          <HomeIcon className={classes.goToMainPageButtonIcon} />
            Go to main page
        </Button>
      }
    </div>
  );
}

function renderFooter(classes: StyleProps['classes']) {
  return (
    <div className={classes.footer}>
      <div className={classes.footerContent}>
        <Typography>
          &copy; 2018-{dateUtils.getYear(dateUtils.getCurrentDate())} {siteName}
        </Typography>
        <Typography>
          <a href={pagePath.privacy}>Privacy Policy</a>
        </Typography>
        <Typography>
          <a href={pagePath.cookies}>Cookie Policy</a>
        </Typography>
        <Typography>
          <a href={pagePath.terms}>Terms of Use</a>
        </Typography>
        <Typography>
          Contact Us <a href={`mailto:${siteEmail}`}>{siteEmail}</a>
        </Typography>
      </div>
    </div>
  );
}

const GcPageView: React.SFC<Props & StyleProps> = (
  {classes, content, discusId, title, hideHomeButton}) => {

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className={classes.root}>
        {renderHeader(classes)}
        {renderContent(classes, content, hideHomeButton)}
      </div>
      <div className={classes.discussContainer}>
        {discusId && <GcDiscus id={discusId}/>}
      </div>
      {renderFooter(classes)}
    </>
 );
};

export const GcPage =
  withStyles(stylesCallback, {withTheme: true})(GcPageView);
