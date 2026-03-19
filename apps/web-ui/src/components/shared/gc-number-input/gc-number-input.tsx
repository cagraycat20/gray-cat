import {
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import * as React from 'react';
import { csn } from '../../../shared';

type GcNumberInputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    // tslint:disable-next-line: no-any
    inputRef?: React.Ref<any> | React.RefObject<any>;
    integerPartLength?: number;
    decimalPartLength?: number;
  };

export const NUMBER_INPUT_DECIMAL_SCALE = 2;

const styles = {
  noButtons: {
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '-moz-appearance' : 'textfield',
  },
};

class GcNumberInputInternal extends
  React.Component<GcNumberInputProps & WithStyles<keyof typeof styles>, {}> {
  public static defaultProps = {
    integerPartLength: 4,
    decimalPartLength: 0,
  };

  public render() {
    const { inputRef, onChange, onKeyPress,
      integerPartLength, decimalPartLength, className, classes, ...other } = this.props;
    return (
      <input
        {...other}
        className={csn(className, classes.noButtons)}
        onChange={this.onChange}
        ref={inputRef}
        onKeyPress={this.onKeyPress}
        type="number"
      />
    );
  }

  private test(input: string): boolean {
    const {integerPartLength, decimalPartLength} = this.props;
    const regexp = decimalPartLength
      ? new RegExp(`^\\d{0,${integerPartLength}}(\\.\\d{0,${decimalPartLength}})?$`)
      : new RegExp(`^\\d{0,${integerPartLength}}$`);
    return regexp.test(input);
  }

  private allowedChar(char: string): boolean {
    const {decimalPartLength, value} = this.props;

    if (/\d/.test(char)) { // if digit
      return true;
    }
    const sepRegex = /\.|,/;
    return !!decimalPartLength &&
      sepRegex.test(char) &&
      !sepRegex.test(String(value)); // only one separator allowed
  }

  private onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!this.allowedChar(String.fromCharCode(event.charCode))) {
      event.preventDefault();
    } else if (this.props.onKeyPress) {
      this.props.onKeyPress(event);
    }
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {onChange} = this.props;
    if (onChange) {
      const {value} = event.target;
      if (this.test(value)) {
        onChange(event);
      }
    }
  }
}

export const GcNumberInput = withStyles(styles)(GcNumberInputInternal);

export function GcNumberTextField({InputProps, ...props}: TextFieldProps) {
  return (
    <TextField
      {...props}
      InputProps={{
        ...InputProps,
      // tslint:disable: no-any
        inputComponent: GcNumberInput as any, // tslint:disable-line: no-any
      } as any}
      // tslint:enable: no-any
    />
  );
}
