import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import {
  GcClickableItem,
  GcDialog,
  logRender,
} from '../../..';
import { csn, dateUtils as du, GcText, ProductWeight } from '../../../../shared';
import { GcFoodCardContainer } from '../gc-food-card/gc-food-card.container';
import {
  GcSaveMealStylesCallback,
  StyleProps,
  viewStyle,
} from './gc-save-meal-dialog.styles';
import { Props } from './gc-save-meal-dialog.types';

interface State {
  mealName: string;
  showMealNameError: boolean;
}

const MEAL_NAME_PADDING = 36;

class GcSaveMealDialogView extends React.PureComponent<Props & StyleProps, State> {

  public state: State = {
    mealName: 'My meal: ' + du.getFormattedDate(new Date(), 'EEEE (MMM dd)'),
    showMealNameError: false,
  };

  private headerRef = React.createRef<HTMLDivElement>();
  private scrollableContentRef = React.createRef<HTMLDivElement>();

  public render(): JSX.Element {
    logRender(this);

    const { classes, mealItems } = this.props;

    return (
      <GcDialog
        contentClassName={classes.root}
        open={mealItems.length > 0}
        okButtonText="Save"
        noMaxWidth={true}
        onClose={this.cancelAndClose}
        onOkClick={this.saveChanges}
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
    const { classes, mealItems } = this.props;
    const { mealName, showMealNameError } = this.state;

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
            Save a meal
          </GcText>
          <GcClickableItem
            className={classes.headerButton}
            color="inherit"
            onClick={this.cancelAndClose}
          >
            <ClearIcon />
          </GcClickableItem>
        </div>
        <div ref={this.scrollableContentRef}>
          <Scrollbars
            renderView={this.renderScrollContent}
          >
            <div className={classes.scrollableContent}>
              <div className={classes.mealNameRoot}>
                <TextField
                  error={showMealNameError}
                  label="Meal name"
                  value={mealName}
                  variant="outlined"
                  className={classes.mealNameInput}
                  onChange={this.handleMealNameChange}
                  inputProps={{
                    style: {paddingRight: mealName ? MEAL_NAME_PADDING : 0},
                  }}
                />
                <GcClickableItem
                  className={csn(classes.clearMealNameButton, {[classes.invisibleClearMealNameButton]: !mealName})}
                  onClick={this.clearMealName}
                >
                  <ClearIcon />
                </GcClickableItem>
              </div>
              <div className={classes.foodRoot}>
                {
                  mealItems.map(this.renderFood)
                }
              </div>
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }

  // tslint:disable-next-line:no-any
  private renderScrollContent = ({ style, ...props }: any) =>
    <div {...props} style={{...style, ...viewStyle}} />

  private renderFood = (productWeight: ProductWeight): JSX.Element => {
    const { classes } = this.props;

    return (
      <div
        key={productWeight.productId}
        className={classes.foodContainer}
      >
        <GcFoodCardContainer
          key={productWeight.productId}
          productWeight={productWeight}
        />
      </div>
    );
  }

  private handleMealNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ mealName: event.target.value, showMealNameError: false });
  }

  private contentRefCallback = (element: HTMLDivElement) => {
    if (element && this.headerRef.current && this.scrollableContentRef.current) {
      this.scrollableContentRef.current!!.style.height =
        element.clientHeight - this.headerRef.current!!.clientHeight + 'px';
    }
  }

  private clearMealName = () => this.setState({ mealName: '' });

  private saveChanges = () => {
    const { mealName } = this.state;

    if (mealName) {
      this.resetState();

      this.props.onSaveMeal(
        mealName,
        this.props.mealItems.map((value) => {
          return { productId: value.productId, productWeight: value.productWeight };
        }),
      );
    } else {
      this.setState({showMealNameError: true});
      this.props.showPopupMessage({ text: 'Meal name is required' });
    }
  }

  private cancelAndClose = () => {
    this.resetState();
    this.props.onCancel();
  }

  private resetState() {
    this.setState({ mealName: '', showMealNameError: false });
  }
}

export const GcSaveMealDialogViewStyled =
  withStyles(GcSaveMealStylesCallback)(GcSaveMealDialogView);
