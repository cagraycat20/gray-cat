import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { pagePath } from '../../../constants';
import { notGiveUpPng } from '../../assets';
import { SharedPageClasses } from '../../shared/gc-page/gc-page.style';
import { GcPage, UtilsTags } from '../../shared/gc-page/gc-page.view';
import {
  StyleProps,
  stylesCallback,
} from './gc-how-not-to-giveup-page.style';

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
        How not to Give Up
      </Typography>

      <img
        className={classes.mainImage}
        src={notGiveUpPng}
        alt="protomeal"
      />

      <Typography
        className={classes.contentBlock}
        variant="body1"
      >
        OK, now I understand which strategy I need to follow for <b>optimal progress</b>,
        and I’m aware of possible dangers on the way to my goal.
        But I assume that the <b>result won’t be immediate</b>.
        I’ll need to keep to the built scheme for quite a long time.
        And I’ve got a feeling it won’t be easy to hold on and <b>not
        to give up halfway through.</b><br/>
        <b>Right?</b><br/><br/>
      </Typography>
      <div className={classes.textDivider} />
      <Typography
        className={classes.contentBlock}
        variant="body1"
      >
        <br/>
        <b className={classes.highlightedText}>Right… And wrong!</b>
        <br/><br/>
        Of course, no one said it would be very easy.
        However, there’s <b>nothing too difficult</b> as well.

        <br/><br/>
        <b className={classes.highlightedText}>What should be taken into account</b>
        <br/><br/>

        {listNum(1)}. <b>To hurry slowly</b>¹. You’ll achieve the quickest results
        if you do everything <b>slowly</b>, however absurd it may sound at first.
        In particular, it concerns changing calorie intake.
        <b>Stability is critical</b> here. A slow tempo will allow you to avoid
        backslides and to make steady progress. So when you need to reduce
        calorie intake and you are tempted to cut it down by 500 kcal,
        resist this temptation and reduce it only by 100 kcal.
        <br/><br/>

        {listNum(2)}. Not to concentrate on time. Don’t count days, hours and minutes.
        Try to find a regime that you’ll be able to keep to easily and steadily.
        <b> Stability</b> is the most important aspect of this business.
        <br/><br/>

        {listNum(3)}. To avoid a state when the process of counting nutrients
        becomes boring or tiring. And certainly not to let this process
        become annoying. If you want to <b>turn it into a habit</b>, everything
        must be <b>easy and quick – a couple of clicks</b>, a few seconds and that’s it.
        <br/><br/>

        {listNum(4)}. To keep your <b>goal in your head</b>. Always.
        It will allow you to be motivated on a continuing basis.
        Every doubt, like “What is it all for?”, should be blocked
        immediately by reminding yourself about your goal.
        <br/><br/>

        {listNum(5)}. As much as possible, to avoid stress and anxiety.
        A caloric deficit causes stress by default. Try not to add to it
        external triggers. When you find yourself in a bad mood and you
        notice that your heart is beating faster than usually, take into
        account that it may be <b>caused by biological factors</b>, namely by the
        aforementioned caloric deficit.
        <br/><br/>

        {listNum(6)}. To set up an optimal meal schedule. Don’t follow
        <b> pseudoscientific recommendations</b>, which have never been proven.
        It may be appropriate to consume the largest part of calories in the
        evening to avoid anxiety. And it may be OK to <b>skip your breakfast</b> to
        reduce calorie intake for the whole day.
        <br/><br/>

        {listNum(7)}. To remember that your current craving for specific
        food <b>will disappear with time</b>. Sometimes you may have a strong urge
        to give in to temptation to eat a product that doesn’t fall within
        your regime. You may feel it would be reasonable to follow that urge
        because otherwise it will persistently bother you and won't leave you
        in peace. In such cases, remind yourself that it’s another <b>attempt of your
        inner beast to deceive you</b> and to start manipulating you. Remember that the
        <b> urge won’t last permanently</b>. If you ignore it and switch your attention to
        something else, it will quickly fade and recede.
        <br/><br/>

        {listNum(8)}. To <b>monitor your progress</b>. To record every change – of body weight,
        calorie intake etc. Numbers and graphs will allow you to see a tendency.
        They often can help to see your progress and what has already been achieved.
        <br/><br/>

      </Typography>
      <div className={classes.textDivider}/>
        <br/>
        <Typography variant="caption">
          1 – It was the principle (Festina lente) adopted by the outstanding Roman emperor Augustus.
          It helped him to keep power for a few decades and to raise Rome to an unprecedented level of development.
        </Typography>
        <br/>
      <div className={classes.textDivider}/>
    </>
  );
}

const GcHowNotToGiveUpView: React.SFC<StyleProps> = ({classes}) => {
  return (
    <GcPage
      title="How not to Give Up | ProtoMeal"
      discusId={pagePath.danger}
      content={(pageClasses, utilsTags) => renderContent(pageClasses, classes, utilsTags)}
    />
 );
};

export const GcHowNotToGiveUpPage =
  withStyles(stylesCallback, {withTheme: true})(GcHowNotToGiveUpView);
