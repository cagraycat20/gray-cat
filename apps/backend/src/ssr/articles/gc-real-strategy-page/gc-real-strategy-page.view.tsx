import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { pagePath } from '../../../constants';
import { pagePath as pp } from '../../../constants';
import { roadSign } from '../../assets';
import { SharedPageClasses } from '../../shared/gc-page/gc-page.style';
import { GcPage } from '../../shared/gc-page/gc-page.view';
import { StyleProps, stylesCallback } from './gc-real-strategy-page.style';

function renderContent(sharedClasses: SharedPageClasses, ownClasses: StyleProps['classes']) {
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
        Action Strategy
      </Typography>

      <img
        className={classes.mainImage}
        src={roadSign}
        alt="protomeal"
      />

      <Typography
        className={classes.contentBlock}
        variant="body1"
      >
        Disappointed in universal formulas calculating the number of calories (
        <a href={pp.pointlessCalculations}>look here</a>),
        I’m sitting with my head sadly resting on my hands. If this approach is ineffective,
        then what shall I start with? How shall I build a working strategy to
        fight snow-white fat being stored enthusiastically under my skin?
        There must be a rational method tested by a lot of competent people. <b>Right?</b>
        <br/><br/>
      </Typography>
      <div className={classes.textDivider} />
      <Typography
        className={classes.contentBlock}
        variant="body1"
      >
        <br/>
        <b className={classes.highlightedText}>Right!</b>
        <br/><br/>
        But it doesn’t boil down to one number, around which everything revolves.
        <br/><br/>
        <b className={classes.highlightedText}>Plan of action</b>
        <br/><br/>
        <b className={classes.listNumber}>1</b>.	The first thing to do (or rather not to do) is not to change anything.
        That’s right. You should start from the start, but it’s not yet known where this start is.
        So the first step will be to find an <b>INDIVIDUAL</b> reference point.
        To do this, you will need to start keeping a record <b>without changing anything in your diet</b>.
        Thus it will be possible to see the amount of macronutrients and their proportions,
        which are supplied to your body at this stage.
        In a week or two, you will have a general picture with concrete numbers.
        Now you should keep calories under control and not let things drift.
        <br/><br/>

        <b className={classes.listNumber}>2</b>.	To burn excess fat,
        one needs to receive less energy than their body expends.
        It’s the main principle and everybody knows it.
        So the next step will be to <b>cut the calorie intake by 100 kcal</b> at the expense of carbohydrates.
        Proteins and fats are structural macronutrients, and our body usually needs stable
        amounts of them to maintain the health of body tissues,
        while carbohydrates are an energy macronutrient, and calorie deficiency should be created at their expense.
        <br/><br/>

        <b className={classes.listNumber}>3</b>.	In a week you will need to check your progress.
        If your body weight doesn’t change (which is unlikely),
        you will need to repeat step 2 (to cut the calorie intake by another 100 kcal and
        to keep to this diet for a week) until your <b>weight goes down by 1-2 pounds</b> (approx. 0.5-1 kg).
        One-two pounds a week is the optimal speed of burning fat.
        <br/><br/>

        <b className={classes.listNumber}>4</b>.	The calorie intake value,
        which leads to burning subcutaneous fat at this stage,
        is found. Now you’ll start losing weight. Usually the first pounds are mostly water, not fat.
        Nevertheless, after excess water is removed from your body, burning fat will begin anyway.
        Here it’s important <b>not to hurry</b> and to do everything gradually. At first,
        burning fat will be quite fast, then it will slow down and will stop at one point.
        <br/><br/>

        <b className={classes.listNumber}>5</b>.	When losing weight stops,
        <b>don’t panic or hurry</b>. It’s an absolutely natural and expected stage.
        Wait a week or two, keeping to the same calorie intake value.
        If there still won’t be any changes, return to step 2.
        <br/><br/>

        <b className={classes.listNumber}>6</b>.	For advanced dieters.
        The 5 abovementioned steps will be more than enough for the vast
        majority of people to build a great physique. However, if one keeps to this scheme for too long,
        they can come to an excessively low quantity of carbohydrates, which will noticeably reduce their
        energy and put a large stress on their body. Usually it happens when the carbs intake approaches
        100g a day (though it’s very individual). So if it’s impossible to reduce the amount of carbohydrates
        any further without an obvious decrease in your body’s performance, you’ll need to use other methods
        of maintaining caloric deficit, particularly <b>increasing energy expenditure during the day</b>.
        <br/><br/>
      </Typography>
        <div className={classes.textDivider} />
      <Typography
        className={classes.contentBlock}
        variant="body1"
      >
        <br/>
        <b className={classes.highlightedText}>Summary</b><br/><br/>

        <b className={classes.listNumber}>Week 1.</b> Keep
        track of macronutrients without changing the diet.<br/>
        <b className={classes.listNumber}>Week 2.</b> Reduce your
        daily calorie intake by 100 kcal at the expense of carbohydrates.<br/>
        <b className={classes.listNumber}>Week 3.</b>If your
        body weight doesn’t go down, repeat the previous step.<br/>
        <b className={classes.listNumber}>Week 3+n.</b> Keep to the scheme. Repeat step 2
        if your body weight remains the same for more than 2 weeks. <b>Don’t hurry!</b><br/>
        <b className={classes.listNumber}>Week 3+n+1.</b> When you reach limit values
        (if further reduction of your calorie intake significantly weakens your body),
        stop reducing carbohydrates and increase calorie expenditure during the day.<br/><br/>

      </Typography>
      <div className={classes.textDivider} />
      {/* <Typography
        className={classes.contentBlock}
        variant="body1"
      >
        + here is a scheme
      </Typography> */}
    </>
  );
}

const GcRealStrategyView: React.SFC<StyleProps> = ({classes}) => {
  return (
    <GcPage
      title="Action Strategy | ProtoMeal"
      discusId={pagePath.realStrategy}
      content={(pageClasses) => renderContent(pageClasses, classes)}
    />
 );
};

export const GcRealStrategyPage =
  withStyles(stylesCallback, {withTheme: true})(GcRealStrategyView);
