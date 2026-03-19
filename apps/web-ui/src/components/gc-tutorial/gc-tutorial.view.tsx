import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { csn } from '../../shared';
import {
  StyleProps,
  stylesCallback,
} from './gc-tutorial.styles';
import { Props } from './gc-tutorial.types';

export interface State {
}

class GcTutorialView extends
  React.PureComponent<Props & StyleProps, State> {
  public state: State = {
  };

  public render(): JSX.Element {
    const { classes, onRenderContent, onClose } = this.props;

    const portalContent = [
      (
        <div
          key={'content'}
          className={classes.content}
          onMouseDown={this.stopEvent}
          onClick={this.stopEvent}
          onTouchStart={this.stopPropagation}
        >
          <div className={classes.infoContainer}>
            {onRenderContent()}
          </div>
          <Button
            variant="outlined"
            onClick={onClose}
          >
            GOT IT
          </Button>
        </div>
      ),
      (
        <div
          key={'header-cover'}
          className={classes.backgroundHeader}
          onMouseDown={this.stopEvent}
          onClick={this.stopEvent}
          onTouchStart={this.stopPropagation}
        />
      ),
    ];

    return (
      <div
        className={classes.root}
        onMouseDown={this.stopEvent}
        onClick={this.stopEvent}
        onTouchStart={this.stopPropagation}
      >
        <div className={csn(classes.background, classes.backgroundTop)}/>
        <div className={csn(classes.background, classes.backgroundBottom)}/>
        <div className={csn(classes.background, classes.backgroundLeft)}/>
        <div className={csn(classes.background, classes.backgroundRight)}/>
        <div className={classes.backgroundBorder} />
        <ArrowUpIcon className={classes.arrow} />
        {
          ReactDOM.createPortal(portalContent, document.body)
        }
      </div>
    );
  }

  private stopEvent = (event:
    React.SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }

  private stopPropagation = (event:
    React.SyntheticEvent<HTMLElement>) => {
    event.stopPropagation();
  }
}

export const GcTutorialViewStyled =
  withStyles(stylesCallback)(GcTutorialView);
