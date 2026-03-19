import Button, { ButtonProps } from '@material-ui/core/Button';
import { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';

export type ClassKey = 'spinner' | '@keyframes pulse';
type StyleProps = WithStyles<ClassKey>;

const stylesCallback: StyleRulesCallback<ClassKey> = (theme) => ({
  spinner: {
    display: 'inline-block',
    position: 'relative',
    width: '2em',
    height: '1em',
    '& div': {
      borderRadius: '50%',
      display: 'inline-block',
      position: 'absolute',
      width: '0.3em',
      height: '0.3em',
      background: theme.palette.primary.main,
      animation: 'pulse 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite',
    },
    '& div:nth-child(1)': {
      left: '0.5em',
      animationDelay: '-0.24s',
    },
    '& div:nth-child(2)': {
      left: '1em',
      animationDelay: '-0.12s',
    },
    '& div:nth-child(3)': {
      left: '1.5em',
      animationDelay: '0',
    },
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(2)  translate(0, 0.15em)',
    },
    '50%, 100%': {
      transform: 'scale(1) translate(0, 0.25em)',
    },
  },
});

interface GcSpinnerButtonProps extends ButtonProps {
  inProgress?: boolean;
}

const GcSpinnerButtonView: React.SFC<GcSpinnerButtonProps & StyleProps> = (
  {children, disabled, inProgress, classes, ...otherProps},
) => (
  <Button disabled={disabled || inProgress} {...otherProps}>
    {children}
    {inProgress &&
      <div className={classes.spinner}>
        <div/>
        <div/>
        <div/>
      </div>
    }
  </Button>
);

export const GcSpinnerButton =
  withStyles(stylesCallback)(GcSpinnerButtonView);
