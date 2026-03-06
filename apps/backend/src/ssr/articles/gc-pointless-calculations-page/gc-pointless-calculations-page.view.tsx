import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { csn } from '../../../../../web-ui/src/shared';
import { testTubes } from '../../assets';
import { SharedPageClasses } from '../../shared/gc-page/gc-page.style';
import { GcPage } from '../../shared/gc-page/gc-page.view';
import { StyleProps, stylesCallback } from './gc-pointless-calculations-page.style';

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
        Human is not a Test Tube
      </Typography>

      <img
        className={classes.mainImage}
        src={testTubes}
        alt="protomeal"
      />

      <Typography
        className={classes.contentBlock}
        variant="body1"
      >
        OK, I open Google, type <b>"burn fat"</b> and get a lot of results. Hm… Very well!
        Seems like this thing has been thoroughly investigated,
        and it will be quite easy to get appropriate help with questions I’m interested in.
        <br/><br/>
        I open a few pages and see that everywhere the main idea is the same – <b>control of calories</b>.
        OK, it makes sense. I go on googling. "Number of calories".
        This search also yields a great deal of results.
        I open a dozen tabs, look through them and see that actually all of them offer the same:
        select your age, height, body weight and activity level (usually 1 out of 3).
        <br/><br/>
        OK, I enter my data, press the calculation button and presto!
        The monitor shows me that to burn fat I need to consume 2,299 kcal.
        Very nice, I’m excited, what a good service, and what precision: calculated to within one calorie.
        Not even rounded off to 2,300, no-no, <b>exactly 2,299</b>.
        <br/><br/>
        Looks very serious and very professional.
        It’s somewhat strange that so few input parameters were enough for such a precise calculation,
        and many other factors were not taken into account. But never mind, it probably doesn’t matter.
        After all, I have a precise number – 2,299. And now the best strategy for me will be to start
        from this number as a reference point.
        <br/>
        Right? <b>Right?!!</b>
        <br/><br/>
      </Typography>
      <div className={classes.textDivider} />
      <Typography
        className={classes.contentBlock}
        variant="body1"
      >
        <br/>
        <b className={classes.highlightedText}>Wrong!</b>
        <br/><br/>
        Such an attempt to treat all alike and to <b>see people as test tubes</b> looks very attractive,
        especially for those who don’t orient themselves very well to this question yet.
        <br/><br/>
        Such an approach very quickly gives concrete numbers with high precision and offers very
        comprehensible and seemingly very rational solution. Of course, use of formulas*
        can give to some extent approximate statistically average value, but making it your reference
        point is a totally ineffective strategy, which often can cause more damage than benefit.
        <br/><br/>
        <b className={classes.highlightedText}>What is wrong?</b>
        <br/><br/>

        <b className={classes.listNumber}>1</b>. It’s <b>impossible to get such a precise value</b> with so few
        input parameters. An example can be comparison of people of the same age, gender and body weight,
        but with different proportion of fat and muscles.
        The formula will show the same value for all of them,
        while actually the difference in the need for calories between these people
        can be enormous (up to a few hundred percent).
        <br/><br/>

        <b className={classes.listNumber}>2</b>. The number of calories that
        one needs for maintaining or reducing body weight
        is not a set value, it can vary, with a range of up to 50%.
        Thus, how can one say about precision to within one kilocalorie?
        <br/><br/>

        <b className={classes.listNumber}>3</b>. Calories are obtained
        from <b>different sources</b>, and they are not identical.
        For example, calories obtained from protein ≠ calories obtained from carbohydrates.
        Taking into account sources, from which calories are obtained, is no
        less or even more important than taking into account caloric value.
        <br/><br/>

        <b className={classes.listNumber}>4</b>. A diet with the proportions
        of macronutrients and the caloric value needed for maintaining
        or reducing body weight is the goal, which takes time to achieve.
        Changes should be <b>gradual and comfortable</b> for your body.
        To jump into the pit of calorie deficiency after receiving the result
        of abovementioned calculations is definitely a losing strategy.
        <br/><br/>

        <b className={classes.listNumber}>5</b>. However rational this
        operation might seem, calculation of the number of calories
        is not what you should start building your diet with. This value is received in the process
        and is received experimentally and <b>INDIVIDUALLY</b> for each person.
        <br/><br/>

      </Typography>
      <div className={classes.textDivider}/>
      <Typography className={csn(classes.alignLeft, classes.contentBlock)}>
        <br/>
        * The most popular is the Harris-Benedict formula.
      </Typography>
    </>
  );
}

const GcPointlessCalculationsPageView: React.SFC<StyleProps> = ({classes}) => {
  return (
    <GcPage
      title="Human is not a Test Tube! | ProtoMeal"
      discusId="pointless-calculations"
      content={(pageClasses) => renderContent(pageClasses, classes)}
    />
 );
};

export const GcPointlessCalculationsPage =
  withStyles(stylesCallback, {withTheme: true})(GcPointlessCalculationsPageView);
