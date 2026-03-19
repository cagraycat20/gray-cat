import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { logRender } from '..';
import {
  StyleProps,
  stylesCallback,
} from './gc-bidirectional-scrollbox.style';

export interface OwnProps {
  onRenderItem: (index: number) => JSX.Element;
  minItemHeight: number;
  onRowsChanged: (
    from: number,
    to: number,
  ) => void;
}

export interface State {
  rows: Array<number>;
}

const threshold = 100;
const collapsedRowHeight = 50;

class GcBidirectionalScrollBoxView extends React.PureComponent<
OwnProps & StyleProps, State> {
  public state: State = {
    rows: [],
  };

  public needScrollToInitialDate = true;

  public root?: Scrollbars;

  public insertRows(before: boolean = false, callback?: () => void) {
    if (!this.root) {
      return;
    }

    const itemsPerPage = Math.ceil(this.root.getClientHeight() / collapsedRowHeight);
    let {rows} = this.state;

    const startIndex = before ? rows[0] - itemsPerPage - 1 : rows[rows.length - 1] + 1;
    const endIndex = startIndex + itemsPerPage;

    const newRows = [];

    for (let index = startIndex; index <= endIndex; index++) {
      newRows.push(index);
    }

    rows = before ? newRows.concat(rows) : rows.concat(newRows);

    this.setState({rows}, callback);

    if (this.props.onRowsChanged) {
      this.props.onRowsChanged(startIndex, endIndex);
    }
  }

  public insertInitialRows() {
    if (!this.root) {
      return;
    }

    const itemsPerPage = Math.ceil(this.root.getClientHeight() / collapsedRowHeight);
    const newRows = [];
    for (let index = -itemsPerPage; index < itemsPerPage * 2; index++) {
      newRows.push(index);
    }
    this.setState({rows: newRows});
    if (this.props.onRowsChanged) {
      this.props.onRowsChanged(-itemsPerPage, itemsPerPage * 2 - 1);
    }
  }

  public scrollEvent = (event: React.UIEvent<HTMLDivElement>) => {
    if (!this.root) {
      return;
    }

    if (this.root.getScrollTop() < threshold) {
      const offset = this.root.getScrollHeight() - this.root.getScrollTop();
      this.insertRows(true);
      window.requestAnimationFrame(() => {
        if (this.root) {
          this.root.scrollTop(this.root.getScrollHeight() - offset);
        }
      });
    } else {
      const needAdd = (this.root.getScrollHeight() -
        (this.root.getScrollTop() + this.root.getClientHeight()) < threshold);
      if (needAdd) {
        this.insertRows();
      }
    }
  }

  public onRootRef = (div: Scrollbars | null) => {
    if (div) {
      this.root = div;
      this.insertInitialRows();
    }
  }

  public onZeroIndexItemRef = (div: HTMLDivElement | null) => {
    if (div) {
      div.scrollIntoView();
    }
  }

  public getRowReferenceHandler(rowIndex: number) {
    return (div: HTMLDivElement | null) => {
      if (div) {
        if (this.needScrollToInitialDate && (rowIndex === 0)) {
          div.scrollIntoView();
          this.needScrollToInitialDate = false;
        }
      }
    };
  }

  public getClientHeight = () => this.root ? this.root.getClientHeight() : 0;

  public renderRows() {
    const rows = this.state.rows.map((rowIndex) => (
      <div
        className={this.props.classes.item}
        ref={this.getRowReferenceHandler(rowIndex)}
        key={rowIndex}
      >
        {this.props.onRenderItem(rowIndex)}
      </div>
    ));
    return (
      <div>
        {rows}
      </div>
    );
  }

  public render() {
    logRender(this);
    return (
      <div className={this.props.classes.root}>
        <Scrollbars
          ref={this.onRootRef}
          onScroll={this.scrollEvent}
        >
          {this.renderRows()}
        </Scrollbars>
      </div>
    );
  }
}

export const GcBidirectionalScrollBoxViewStyled =
  withStyles(stylesCallback)(GcBidirectionalScrollBoxView);
