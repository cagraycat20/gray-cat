import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { GcBidirectionalScrollBox } from '..';
import { logRender } from '..';
import { dateUtils } from '../../shared';
import {
  GcDaysListItemContainer as GcDaysListItem,
} from './gc-days-list-item/gc-days-list-item.container';
import {
  StyleProps,
  stylesCallback,
} from './gc-days-list.styles';
import { Props } from './gc-days-list.types';

// -5 to see prev. week
const indexToDate = (date: string, index: number) =>
  dateUtils.getFormattedDate(dateUtils.addDays(dateUtils.getDate(date), index - 5));

class GcDaysListView extends
  React.PureComponent<Props & StyleProps> {

  public render(): JSX.Element {
    logRender(this);
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GcBidirectionalScrollBox
          onRowsChanged={this.scrollRowsChanged}
          onRenderItem={this.renderDayListItem}
          minItemHeight={50}
        />
      </div>
    );
  }

  private scrollRowsChanged = (from: number, to: number) => {
    const {date} = this.props;
    this.props.loadDays(indexToDate(date, from), indexToDate(date, to));
  }

  private renderDayListItem = (index: number) => (
    <GcDaysListItem
      date={indexToDate(this.props.date, index)}
      onSelected={this.props.onSelectDay}
    />
  )
}

export const GcDaysListViewStyled =
  withStyles(stylesCallback)(GcDaysListView);
