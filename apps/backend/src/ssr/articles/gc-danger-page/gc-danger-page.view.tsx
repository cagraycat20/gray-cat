import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { pagePath } from '../../../constants';
import { stepOnNail } from '../../assets';
import { SharedPageClasses } from '../../shared/gc-page/gc-page.style';
import { GcPage, UtilsTags } from '../../shared/gc-page/gc-page.view';
import { StyleProps, stylesCallback } from './gc-danger-page.style';

function renderContent(
  sharedClasses: SharedPageClasses,
  ownClasses: StyleProps['classes'],
  { listNum }: UtilsTags,
) {
  const classes = {
    ...sharedClasses,
    ...ownClasses,
  };

  return (
    <>
      <Typography
        variant="h1"
        className={classes.title}
        align="center"
      >
        Be Aware!
      </Typography>

      <img
        className={classes.mainImage}
        src={stepOnNail}
        alt="protomeal"
      />

      <Typography
        className={classes.contentBlock}
        variant="body1"
      >
        OK, very well. I know what to do to liquidate unwanted <b>fat</b> stores <b>resting under my skin</b>.
        Plan of action is quite clear and it doesn’t look very complicated.
        But somehow I feel it’s so easy only on paper.<br/>
        <b>Right?</b><br/><br/>
      </Typography>
      <div className={classes.textDivider} />
      <Typography
        className={classes.contentBlock}
        variant="body1"
      >
        <br/>
        <b className={classes.highlightedText}>Right!</b>
        <br/><br/>
        No one said it would be <b>very</b> easy.
        Of course, there’s <b>nothing too difficult</b> as well.<br/>
        There are, however, a few dangers, which should be taken into consideration.

        <br/><br/>
        <b className={classes.highlightedText}>What should be remembered</b>
        <br/><br/>

        {listNum(1)}.	In most cases, at the beginning,
        when someone has a strategy and a carefully thought-out plan of action,
        there appears a great enthusiasm and confidence in success.
        Such a state may seem useful, as it boosts motivation.
        There is, however, a <b>hidden danger</b> here.
        Not having achieved anything, you will feel like a winner.
        You will start thinking you have success in your pocket and won’t be ready for difficulties ahead.
        To avoid this kind of danger, try to keep in mind the information about your current progress
        and about what is left to be done, and try <b>not to celebrate the victory too early</b>.
        <br/><br/>

        {listNum(2)}.	The most difficult stage of this run is the beginning.
        With a reasonable approach, in a few weeks what you forced
        yourself to do will become a usual thing and won’t cause any difficulties,
        even <b>turning into a habit</b>. So when you start,
        keep this fact in mind and remember that <b>everything will be getting easier</b> with time.
        <br/><br/>

        {listNum(3)}.	Every now and then <b>the beast in you</b> can <b>rebel</b> and incite you to do things,
        which can slow down your progress or even <b>throw you a few steps back</b>.
        In that case, the universal counteraction would be to remind yourself
        (or, even better, to write down and read from time to time)
        what will be if you succumb to these animal impulses and what will be if you don’t.
        There is, however, a high probability that it won’t always help.
        <b>There will be backslides.</b> And they are also absolutely expected.
        Each of such backslides will be a kind of step back,
        but you always can take <b>two steps forward</b> after that.
        <br/><br/>

        {listNum(4)}.	(Optionally) When your diet becomes a model
        for other people and when they see changes in your physique,
        for some of them it may become a kind of <b>reproach</b>.
        They’ll be upset to see someone achieving such <b>good results</b>.
        So <b>be ready for</b> all kinds of <b>critical comments</b> about
        your values and attempts to belittle your results.
        If you understand the source of such attacks, they won’t be dangerous to you.
        <br/><br/>

      </Typography>
      <div className={classes.textDivider}/>
    </>
  );
}

const GcDangerView: React.SFC<StyleProps> = ({classes}) => {
  return (
    <GcPage
      title="Be Aware! | ProtoMeal"
      discusId={pagePath.danger}
      content={(pageClasses, utilsTags) => renderContent(pageClasses, classes, utilsTags)}
    />
 );
};

export const GcDangerPage =
  withStyles(stylesCallback, {withTheme: true})(GcDangerView);
