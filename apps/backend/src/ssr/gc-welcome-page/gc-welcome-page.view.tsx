import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import ViewListIcon from '@material-ui/icons/ViewList';
import * as React from 'react';
import {
  csn,
  globalClasses,
} from '../../../../web-ui/src/shared';
import {
  desktopIntroMp4,
  desktopIntroWebm,
  mobileIntroMp4,
  mobileIntroWebm,
} from '../assets';
import { RequestConsumer } from '../request-context';
import { GcPage } from '../shared/gc-page/gc-page.view';
import {
  ArticleInfo,
  articles,
} from './articles';
import { StyleProps, stylesCallback } from './gc-welcome-page.style';

function renderArticle(classes: StyleProps['classes'], articleInfo: ArticleInfo, index: number) {
  return (
    [
      <Divider key={'divider-' + index} className={classes.divider} />,
      (
        <a
          key={'article-container' + index}
          className={csn(
            classes.articleContainer,
            articleInfo.imageRight
              ? classes.articleContainerRightAligned
              : undefined,
          )}
          href={articleInfo.link}
        >
          <img
            className={classes.articleImage}
            src={articleInfo.image}
            alt="protomeal"
          />
          <div
            className={csn(
              classes.articleTextContainer,
              articleInfo.imageRight
                ? classes.articleTextContainerMarginRight
                : classes.articleTextContainerMarginLeft,
            )}
          >
            <Typography
              variant="h4"
              className={classes.articleTitle}
              align="center"
            >
              {articleInfo.title}
            </Typography>

            <Typography
              className={classes.articleText}
              variant="h6"
              align="justify"
            >
              {articleInfo.text}
            </Typography>

            <Typography
              className={classes.articleReadMoreCaption}
              variant="overline"
              align="center"
              color="primary"
            >
              Read more
            </Typography>
          </div>
        </a>
      ),
    ]
  );
}

function renderContent(classes: StyleProps['classes']) {
  return (
    <>
      <Typography
        variant="h4"
        className={classes.title}
        gutterBottom={true}
      >
        Powerful online tool to manage your nutrition
      </Typography>

      <Typography
        variant="h6"
        className={classes.subTitle}
      >
        Monitor, log, analyze macronutrients and calories.
        Take care of your body the way it deserves.
      </Typography>

      <div className={classes.demoContainer}>
        <video
          controls={true}
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          className={classes.demo}
        >
          <RequestConsumer>
            {({ isDesktop }) => {
              return isDesktop ? (
                <>
                  <source src={desktopIntroWebm} type="video/webm" />
                  <source src={desktopIntroMp4} type="video/mp4" />
                </>
              ) : (
                <>
                  <source src={mobileIntroWebm} type="video/webm" />
                  <source src={mobileIntroMp4} type="video/mp4" />
                </>
              );
            }}
          </RequestConsumer>
        </video>
      </div>

      {articles.map((articleInfo, index) => renderArticle(classes, articleInfo, index))}

      <Divider className={classes.divider} />
      <br/>
      <Button
        href={'/food'}
        color="primary"
        variant="contained"
        className={globalClasses.gcAlignSelfCenter}
      >
        <ViewListIcon className={globalClasses.gcButtonIcon}/>
        Product list
      </Button>
      <br/>
      <Typography
        variant="caption"
        className={csn(
          globalClasses.gcAlignSelfCenter,
          globalClasses.gcGreyText,
        )}
      >
        Click to see products from Protomeal database.
      </Typography>
      <br/>
      <Divider className={classes.divider} />
    </>
  );
}

const GcWelcomeView: React.SFC<StyleProps> = ({ classes }) => {
  return (
    <GcPage
      title="ProtoMeal - Powerful online tool to manage your nutrition"
      discusId="welcome-page"
      content={renderContent(classes)}
      hideHomeButton={true}
    />
  );
};

export const GcWelcome =
  withStyles(stylesCallback, { withTheme: true })(GcWelcomeView);
