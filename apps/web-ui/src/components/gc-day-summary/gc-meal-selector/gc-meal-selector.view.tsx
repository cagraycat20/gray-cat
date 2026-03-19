import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Popover from '@material-ui/core/Popover';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import * as React from 'react';
import { LiveTimeIcon } from '../../../assets/icons/live-time.icon';
import { dateUtils } from '../../../shared';
import { Point } from '../../../types';
import { dayInfoHelper as dih } from '../../../utils';
import { GcTimeInputDialog } from '../../shared';
import { Props } from './gc-meal-selector.types';

interface State {
  timeInputPoint: Point | null;
}

class GcMealSelectorView extends React.PureComponent<Props, State> {

  public state: State = {
    timeInputPoint: null,
  };

  public render(): JSX.Element {
    const { anchor, meals, onClose } = this.props;
    const { timeInputPoint } = this.state;

    return (
      <Popover
        open={!!anchor}
        anchorReference="anchorEl"
        anchorEl={anchor}
        onClose={onClose}
      >
        <List
          subheader={
            <ListSubheader
              component="div"
            >
              Choose time to add saved meal to
            </ListSubheader>
          }
        >
          <Divider />
          {
            meals.map(this.renderMeal)
          }
          <ListItem
            button={true}
            onClick={this.handleAddToSpecTimeClick}
          >
            <ListItemIcon>
              <AvTimerIcon />
            </ListItemIcon>
            <ListItemText primary="Specified Time" />
          </ListItem>
        </List>

        <GcTimeInputDialog
          point={timeInputPoint}
          onSubmit={this.handleTimeInputSubmit}
          onClose={this.handleTimeInputClose}
        />
      </Popover>
    );
  }

  private renderMeal = (time: number): JSX.Element => {
    return (
      <ListItem
        key={time}
        button={true}
        onClick={this.handleMealClick(time)}
      >
        <ListItemIcon>
          <LiveTimeIcon {...dih.mealTimeDetails(time)} />
        </ListItemIcon>
        <ListItemText
          primary={dih.formatMealTime(time)}
        />
      </ListItem>
    );
  }

  private handleMealClick = (time: number) => () => {
    this.props.onMealSelected(time);
  }

  private handleAddToSpecTimeClick = (event: React.MouseEvent<Element>) => {
    this.setState({
      timeInputPoint: {
        x: event.pageX,
        y: event.pageY,
      },
    });
  }

  private handleTimeInputSubmit = (date: Date) => {
    this.props.onMealSelected(dateUtils.getHours(date) * 60 + dateUtils.getMinutes(date));
    this.setState({ timeInputPoint: null });
  }

  private handleTimeInputClose = () => {
    this.setState({ timeInputPoint: null });
  }
}

export const GcMealSelectorViewStyled = GcMealSelectorView;
