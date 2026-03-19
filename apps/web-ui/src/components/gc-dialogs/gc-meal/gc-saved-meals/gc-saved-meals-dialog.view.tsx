import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import ClearIcon from '@material-ui/icons/Clear';
import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import {
  GcClickableItem,
  GcDialog,
  logRender,
} from '../../..';
import { GcText, SavedMeal } from '../../../../shared';
import { GcMealCardContainer as GcMealCard } from './gc-meal-card/gc-meal-card.container';
import {
  GcSavedMealsStylesCallback,
  StyleProps,
  viewStyle,
} from './gc-saved-meals-dialog.styles';
import { Props } from './gc-saved-meals-dialog.types';

interface State {
  selectedMeal: SavedMeal | null;
}

class GcSavedMealsDialogView extends
  React.PureComponent<Props & StyleProps, State> {

  public state: State = {
    selectedMeal: null,
  };

  private headerRef = React.createRef<HTMLDivElement>();
  private scrollableContentRef = React.createRef<HTMLDivElement>();

  public render(): JSX.Element {
    logRender(this);

    const { classes, addSavedMeal, savedMeals } = this.props;
    const { selectedMeal } = this.state;

    return (
      <GcDialog
        contentClassName={classes.root}
        open={Boolean(addSavedMeal)}
        okButtonText="Add"
        noMaxWidth={false}
        okButtonIsInactive={savedMeals.length === 0 || !selectedMeal}
        onClose={this.handleCloseClick}
        onOkClick={this.handleAddClick}
        additionalDialogActions={
          <div className={classes.deleteActionRoot}>
            <Button
              color="primary"
              disabled={savedMeals.length === 0 || !selectedMeal}
              onClick={this.handleDeleteClick}
            >
              Delete
            </Button>
          </div>}
      >
        <div
          className={classes.content}
          ref={this.contentRefCallback}
        >
          {this.renderContent()}
        </div>
      </GcDialog>
    );
  }

  private renderContent() {
    const { classes, savedMeals } = this.props;

    return (
      <div className={classes.contentRoot}>
        <div
          className={classes.header}
          ref={this.headerRef}
        >
          <GcText
            className={classes.title}
            custom={{ size: 'xlarge', color: 'white'}}
          >
            Saved meals
          </GcText>
          <GcClickableItem
            className={classes.headerButton}
            color="inherit"
            onClick={this.handleCloseClick}
          >
            <ClearIcon />
          </GcClickableItem>
        </div>
        <div ref={this.scrollableContentRef}>
          <Scrollbars
            renderView={this.renderScrollContent}
          >
            <div className={classes.foodRoot}>
              { savedMeals.length > 0
                ? savedMeals.map(this.renderMeal)
                :
                  <div className={classes.noSavedMealsRoot}>
                    <GcText
                      custom={{color: 'grey'}}
                      className={classes.noSavedMealsText}
                    >
                      No saved meals
                    </GcText>
                  </div>
              }
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }

  // tslint:disable-next-line:no-any
  private renderScrollContent = ({ style, ...props }: any) =>
    <div {...props} style={{...style, ...viewStyle}} />

  private renderMeal = (meal: SavedMeal, index: number): JSX.Element => {
    const { selectedMeal } = this.state;

    return (
      <GcMealCard
        key={index}
        meal={meal}
        isSelected={!!selectedMeal && meal.id === selectedMeal.id}
        onMealClick={this.handleMealClick}
      />
    );
  }

  private contentRefCallback = (element: HTMLDivElement) => {
    if (element && this.headerRef.current && this.scrollableContentRef.current) {
      this.scrollableContentRef.current!!.style.height =
        element.clientHeight - this.headerRef.current!!.clientHeight + 'px';
    }
  }

  private handleCloseClick = () => {
    this.props.onCancel();
    this.resetState();
  }

  private handleAddClick = () => {
    const { selectedMeal } = this.state;

    if (selectedMeal) {
      this.props.onAddMeal(this.props.addSavedMeal!!, selectedMeal);
    }

    this.resetState();
  }

  private handleMealClick = (meal: SavedMeal) => {
    this.setState({ selectedMeal: meal });
  }

  private handleDeleteClick = () => {
    const { selectedMeal } = this.state;

    if (selectedMeal) {
      this.props.onDeleteMeal(selectedMeal);
    }

    this.resetState();
  }

  private resetState() {
    this.setState({ selectedMeal: null });
  }
}

export const GcSavedMealsDialogViewStyled =
  withStyles(GcSavedMealsStylesCallback)(GcSavedMealsDialogView);
