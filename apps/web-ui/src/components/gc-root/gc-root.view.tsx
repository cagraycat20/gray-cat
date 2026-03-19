import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { BrowserRouter, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  GcContainerLayer,
  GcDialogs,
  GcDragLayer,
  GcHintDialog,
  GcIntro,
  GcMainBar,
  GcMainPage,
  GcPopupMessage,
  logRender,
  PropsOf,
} from '..';
import { GcAdminContainer } from '../gc-admin/gc-admin.container';
import { PositionMonitor } from '../gc-drag-layer/gc-drag-layer';
import { GcPageNotFound } from '../gc-page-not-found/gc-page-not-found.view';
import {
  StyleProps,
  stylesCallback,
} from './gc-root.styles';
import { Props } from './gc-root.types';

type ApplyStyleCallback = PropsOf<typeof
  GcContainerLayer>['onGetApplyStyleCallback'];

interface GcRootViewState {
}

const scrolledHeaderStyle: React.CSSProperties = {
  transform: `translateY(-100%)`,
};

class GcRootView extends React.PureComponent<Props & StyleProps, GcRootViewState> {
  public state: GcRootViewState = {
  };

  private positionMonitor?: PositionMonitor; // for drag layer
  private resizeHandler$ = new Subject();

  private applyStyleToHeader?: (style: React.CSSProperties | undefined) => void;

  public componentDidMount() {
    this.resizeHandler$
      .pipe(debounceTime(10))
      .subscribe(() => this.props.onResize(window.innerHeight, window.innerWidth));
    window.addEventListener('resize', this.resize);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    this.resizeHandler$.unsubscribe();
  }

  public render() {
    logRender(this);
    const { classes, showIntro } = this.props;

    return (
      <BrowserRouter basename={'/app'}>
        <>
          <div
            className={classes.root}
            onDragOver={this.dragOver}
            onDragEnd={this.dragEnd}
          >
            {showIntro && <GcIntro />}

            <GcDragLayer
              onRegisterPositionMonitor={this.registerPositionMonitor}
            />

            <div className={classes.headerAreaBackground} />

            <GcContainerLayer
              className={classes.header}
              onGetApplyStyleCallback={this.getApplyStyleCallback}
            >
              <GcMainBar />
            </GcContainerLayer>

            <div className={classes.content}>
              <Switch>
                <Route path="/admin" component={GcAdminContainer} />
                <Route path="/" exact={true} render={this.renderMainPage} />
                <Route path="/" component={GcPageNotFound} />
              </Switch>
            </div>
            <GcPopupMessage />
          </div>

          <GcDialogs />
          <GcHintDialog />
        </>
      </BrowserRouter>
    );
  }

  private getApplyStyleCallback: ApplyStyleCallback = (applyStyle) =>
    this.applyStyleToHeader = applyStyle

  private resize = () => this.resizeHandler$.next();

  private dragEnd = () => {
    if (this.positionMonitor) {
      this.positionMonitor(0, 0, false);
    }
  }

  private dragOver = (event: React.DragEvent<Element>) => {
    if (this.positionMonitor) {
      this.positionMonitor(event.clientX, event.clientY, true);
    }
  }

  private registerPositionMonitor = (positionMonitor: PositionMonitor) => {
    this.positionMonitor = positionMonitor;
  }

  private scrollHeaderHandler = (scrolled: boolean) => {
    if (this.applyStyleToHeader) {
      if (this.props.mobileLayout && scrolled) {
        this.applyStyleToHeader(scrolledHeaderStyle);
      } else {
        this.applyStyleToHeader(undefined);
      }
    }
  }

  private renderMainPage = (props: RouteComponentProps) => {
    return (
      <GcMainPage onSetHeaderScrolledState={this.scrollHeaderHandler} {...props} />
    );
  }
}

const GcRootStyled =
  withStyles(stylesCallback)(GcRootView);

export const GcRootViewWithDndContext =
  DragDropContext(HTML5Backend)(GcRootStyled);
