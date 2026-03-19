import withStyles from '@material-ui/core/styles/withStyles';
import { StandardTextFieldProps } from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import * as React from 'react';
import {
  GcClickableItem,
  GcNumberTextField,
  mathUtils,
  NUMBER_INPUT_DECIMAL_SCALE,
} from '../..';
import { csn } from '../../../shared';
import {
  StyleProps,
  stylesCallback,
} from './gc-number-input-with-buttons.styles';

type Props = StandardTextFieldProps & {incValue: number};

class GcNumberInputWithButtonsView extends
  React.PureComponent<Props & StyleProps> {

  public render(): JSX.Element {
    const { classes, incValue, className, ...rest } = this.props;

    return (
      <div className={csn(classes.root, className)}>
        <GcClickableItem
          tabIndex={-1}
          className={csn(classes.button, classes.leftButton)}
          onClick={this.incValueClick}
        >
          <AddIcon className={classes.buttonIcon} />
        </GcClickableItem>

        <GcNumberTextField
          className={classes.input}
          InputLabelProps={{
            shrink: true,
          }}
          {...rest}
        />

        <GcClickableItem
          tabIndex={-1}
          className={csn(classes.button, classes.rightButton)}
          onClick={this.decValueClick}
        >
          <RemoveIcon className={classes.buttonIcon} />
        </GcClickableItem>
      </div>
    );
  }

  private incValue = (inc: number) => {
    const { value, inputProps, onChange } = this.props;

    const curValue = parseFloat(value + '') || 0;
    let newValue = mathUtils.round(
      Math.max(curValue + inc, 0), NUMBER_INPUT_DECIMAL_SCALE);
    if (inputProps && inputProps.max) {
      newValue = Math.min(newValue, inputProps.max);
    }
    if (inputProps && inputProps.min) {
      newValue = Math.max(newValue, inputProps.min);
    }

    if (curValue !== newValue) {
      if (onChange) {
        onChange({
          target: {
            value: newValue.toString(),
          },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  }

  private incValueClick = () => this.incValue(this.props.incValue);

  private decValueClick = () => this.incValue(-this.props.incValue);
}

export const GcNumberInputWithButtonsViewStyled =
  withStyles(stylesCallback)(GcNumberInputWithButtonsView);
