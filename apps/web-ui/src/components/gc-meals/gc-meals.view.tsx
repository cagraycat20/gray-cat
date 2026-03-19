import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RedoIcon from '@material-ui/icons/Redo';
import * as React from 'react';
import Scrollbars, { positionValues } from 'react-custom-scrollbars';
import * as DnD from 'react-dnd';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { dateUtils as du, logEvent } from '..';
import {
  dayInfoHelper as dih,
  DndProduct,
  GcMeal,
  GcProductDropArea,
  GcTimeInputDialog,
  logRender,
  Point,
  Product,
} from '..';
import {
  fourColPlaceholder,
  intro,
  twoColPlaceholder,
} from '../../assets';
import { csn, GcText } from '../../shared';
import { dateUtils } from '../../shared';
import {
  gcDayStylesCallback,
  slideContainerStyle,
  StyleProps,
  thumbStyle,
  viewStyle,
} from './gc-meals.styles';
import {
  Props,
} from './gc-meals.types';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

interface State {
  droppedProductId?: Product['id'];
  point: Point | null;
  index: number;
}

const emptySlide: React.CSSProperties = {
  opacity: 0.25,
  height: '100%',
};

const emptySlide2col: React.CSSProperties = {
  ...emptySlide,
  background: `url(${twoColPlaceholder}) 0px 65px no-repeat`,
  width: '319px',
};

const emptySlideText4col: React.CSSProperties = {
  top: '166px',
};

const emptySlide4col: React.CSSProperties = {
  ...emptySlide,
  background: `url(${fourColPlaceholder}) 0px 65px no-repeat`,
  width: '650px',
};

class GcMealsView extends React.PureComponent<Props & StyleProps, State> {

  public state: State = {
    point: null,
    index: 0,
  };

  private scrollBars: Scrollbars | null = null;
  private slideTimeout: NodeJS.Timer | null = null;
  private initialDate: string = '';
  private currentDate: string = '';
  private swiping?: boolean;
  private indexToRender: number = 0;

  public componentDidUpdate(prevProps: Props) {
    if (this.props.date !== prevProps.date) {
      if (this.scrollBars) {
        this.scrollBars.scrollTop(0);
        this.props.onScroll(0);
      }
    }
  }

  public render() {
    logRender(this);
    const { classes, date } = this.props;
    const { point } = this.state;

    if (this.currentDate !== date) {
      this.currentDate = date;
      this.indexToRender = this.state.index;
      if (this.swiping) {
        this.swiping = false;
      } else {
        this.initialDate = du.getFormattedDate(
          du.subtractDays(date, this.state.index));
      }
    }

    return [
      (
        <VirtualizeSwipeableViews
          key={'content'}
          className={classes.root}
          slideClassName={classes.slide}
          containerStyle={slideContainerStyle}
          index={this.state.index}
          overscanSlideBefore={1}
          overscanSlideAfter={1}
          onChangeIndex={this.changeSwipeIndex}
          onSwitching={this.clearSwipeTimeout}
          onTransitionEnd={this.setSwipeTimeout}
          slideRenderer={(params) => this.renderContent(params.index)} // for re-render
        />
      ),
      (
        <GcTimeInputDialog
          key="time-input"
          point={point}
          onSubmit={this.submitTimeInput}
          onClose={this.timeInputClose}
        />
      ),
    ];
  }

  private renderContent = (index: number) => {
    const { classes, twoColumns } = this.props;

    if (this.indexToRender !== index) {
      const date = du.getFormattedDate(
        du.addDays(du.getDate(this.initialDate), index),
        'EEEE (MMM dd)',
      ).toUpperCase();
      return (
        <div
          key={index}
          className={classes.emptySlide}
        >
          <Typography
            className={classes.emptySlideText}
            style={!twoColumns ? emptySlideText4col : undefined}
          >
            {date}
          </Typography>
          <div
            style={
              twoColumns
                ? emptySlide2col
                : emptySlide4col
            }
          />
        </div>
      );
    }

    return (
      <GcProductDropArea
        key={index}
        relatedData={this.props}
        className={classes.container}
        canDrop={this.forbidDrop}
        content={this.renderMealsContent}
      />
    );
  }

  private renderMealsContent = (isOver: boolean) => {
    const { classes } = this.props;
    return (
      <Scrollbars
        ref={this.scrollbarsRef}
        renderThumbVertical={this.renderThumb}
        onScrollFrame={this.scrollHandler}
        renderView={this.renderScrollContent}
      >
        <div className={classes.topGapStyle} />
        {this.renderMeals(isOver)}
        <div className={classes.bottomSpace} />
      </Scrollbars>
    );
  }

  // tslint:disable-next-line: no-any
  private renderThumb = ({ style, ...props }: any) =>
    <div style={{ ...style, ...thumbStyle }} {...props} />

  // tslint:disable-next-line: no-any
  private renderScrollContent = ({ style, ...props }: any) =>
    <div {...props} style={{ ...style, ...viewStyle }} />

  private renderMeals = (dragging: boolean) => {
    const { classes, mobileLayout, dayMealsInfo,
      needScrollToProduct, onGetEditingProduct } = this.props;

    const mealTimes = Object.keys(dayMealsInfo).map((mealKeyIter) =>
      parseInt(mealKeyIter, 10));
    mealTimes.sort((first, second) => first - second);

    const result = mealTimes.map((mealTimeIter, index) => (
      <GcMeal
        key={'meal:' + mealTimeIter}
        mealTime={mealTimeIter}
        consumedProducts={dayMealsInfo[mealTimeIter]}
        isLast={!dragging && index === mealTimes.length - 1}
        needScrollToProduct={needScrollToProduct}
        onGetEditingProduct={onGetEditingProduct}
      />
    ));

    if (result.length < 1) {
      result.push(
        <GcProductDropArea
          key={'no-meals-content' + (mobileLayout ? '-mobile' : '')}
          relatedData={this.props}
          className={classes.emptyContentContainer}
          canDrop={this.forbidDrop}
          content={this.renderEmptyContent}
        />,
      );
    } else if (dragging) {
      result.push(
        <div
          key={'custom-time'}
          className={classes.customTimeDndAreaContainer}
        >
          {this.renderCustomTimeDndArea(classes.contentWidth)}
        </div>,
      );
    }
    return result;
  }

  private renderEmptyContent = (isOver: boolean) => {
    const { classes, mobileLayout, canCopyFromYesterday,
      isIntroductionMode, onShowProductAddDialog } = this.props;
    return (
      <div className={csn(classes.emptyContent, classes.contentWidth)}>
        {
          !isOver &&
          <>
            {
              !mobileLayout &&
              <>
                <Typography
                  variant="h5"
                  className={csn(classes.dragHereCaption, classes.dragCaptionColor)}
                >
                  Drag food here
                </Typography>
                {
                  isIntroductionMode &&
                  <>
                    <br />
                    <Typography
                      variant="h5"
                      className={csn(classes.dragHereCaption, classes.dragCaptionColor)}
                    >
                      Just click it and select meal time
                    </Typography>
                    <img
                      className={classes.demo}
                      src={intro}
                      alt="protomeal"
                    />
                  </>
                }
              </>
            }
            {
              mobileLayout &&
              <>
                <Button
                  color="primary"
                  className={classes.button}
                  size="large"
                  variant="contained"
                  onClick={onShowProductAddDialog}
                >
                  <AddIcon className={classes.buttonIcon} />
                  Add Food
                </Button>
                <br />
              </>
            }
            {
              !isIntroductionMode &&
              canCopyFromYesterday &&
              <>
                <GcText
                  custom={{
                    size: 'xlarge',
                  }}
                >
                  or
                </GcText>
                <Button
                  color="primary"
                  className={classes.button}
                  size="large"
                  variant="contained"
                  onClick={this.copyFromYesterday}
                >
                  <RedoIcon className={classes.buttonIcon} />
                  Copy From yesterday
                </Button>
              </>
            }
          </>
        }
        {
          isOver &&
          this.renderDndArea()
        }
      </div>
    );
  }

  private renderDndArea = () => {
    const { classes, onChangeProductWeight, date, meals } = this.props;

    return (
      <div className={classes.emptyContentDndArea}>
        {
          meals.map((iter) => (
            <GcProductDropArea
              key={iter}
              className={classes.emptyContentDndItem}
              onDndDrop={(props: object, monitor: DnD.DropTargetMonitor) => {
                const item = monitor.getItem() as DndProduct;
                if (item && item.productId) {
                  onChangeProductWeight(
                    item.productId,
                    100,
                    date,
                    iter,
                  );
                }
              }}
              content={(isOver) => (
                <div
                  className={csn(
                    classes.dndItemContent,
                    { [classes.dndItemContentOver]: isOver },
                  )}
                >
                  <Typography
                    className={classes.dragCaptionColor}
                    variant="caption"
                  >
                    Drop here to add to
                  </Typography>
                  <Typography
                    className={classes.dragCaptionColor}
                    variant="h4"
                  >
                    {dih.formatMealTime(iter)}
                  </Typography>
                </div>
              )}
            />
          ))
        }
        {this.renderCustomTimeDndArea(
          csn(classes.emptyContentDndItem, classes.emptyContentDndLastItem))}
      </div>
    );
  }

  private renderCustomTimeDndArea = (rootClass: string) => {
    const { classes } = this.props;
    return (
      <GcProductDropArea
        className={rootClass}
        onDndDrop={(props: object, monitor: DnD.DropTargetMonitor) => {
          const item = monitor.getItem() as DndProduct;
          if (item && item.productId) {
            this.setState({
              droppedProductId: item.productId,
              point: { ...monitor.getClientOffset() },
            });
          }
        }}
        content={(isOver, dndMonitor) => {
          const item = dndMonitor && (dndMonitor.getItem() as DndProduct);
          const fromMeal = item && item.fromMeal;

          return (
            <div
              className={csn(
                classes.dndItemContent,
                { [classes.dndItemContentOver]: isOver },
              )}
            >
              <Typography
                variant="caption"
                className={classes.dragCaptionColor}
              >
                Drop here to {fromMeal ? ' copy to' : ''}
              </Typography>
              <Typography
                variant="h4"
                className={classes.dragCaptionColor}
              >
                {fromMeal ? 'Specified Time' : 'Specify Time'}

              </Typography>
            </div>
          );
        }}
      />
    );
  }

  private scrollbarsRef = (scrollbars: Scrollbars) =>
    this.scrollBars = scrollbars

  private scrollHandler = (values: positionValues) => {
    this.props.onScroll(values.scrollTop);
  }

  private slideTimeoutCallback = () => {
    this.props.onChangeDate(
      du.getFormattedDate(du.addDays(this.initialDate, this.state.index)),
    );
  }

  private setSwipeTimeout = () => {
    this.slideTimeout = setTimeout(this.slideTimeoutCallback, 300);
  }

  private clearSwipeTimeout = () => {
    if (this.slideTimeout) {
      clearTimeout(this.slideTimeout);
      this.slideTimeout = null;
    }
  }

  private changeSwipeIndex = (index: number) => {
    this.swiping = true;
    this.setState({ index });
  }

  private forbidDrop = () => false;

  private submitTimeInput = (time: Date) => {
    const newTime = dateUtils.getMealTime(time);
    const { onChangeProductWeight, date } = this.props;
    const { droppedProductId } = this.state;
    if (droppedProductId) {
      onChangeProductWeight(
        droppedProductId,
        100,
        date,
        newTime,
      );
    }
    this.timeInputClose();
  }

  private timeInputClose = () =>
    this.setState({
      droppedProductId: undefined,
      point: null,
    })

  private copyFromYesterday = () => {
    logEvent('CopyFromYesterdayClick');
    const { onCopyFromDay, date } = this.props;
    onCopyFromDay(dateUtils.getFormattedDate(dateUtils.subtractDays(date, 1)), date);
  }
}

export const GcMealsViewStyled =
  withStyles(gcDayStylesCallback)(GcMealsView);
