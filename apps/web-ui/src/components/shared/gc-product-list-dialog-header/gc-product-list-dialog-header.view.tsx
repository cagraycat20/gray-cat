import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { GcClickableItem } from '../..';
import { usu } from '../../../utils';
import {
  StyleProps,
  stylesCallback,
} from './gc-product-list-dialog-header.styles';
import { Props } from './gc-product-list-dialog-header.types';

export interface State {
}

class GcProductListDialogHeaderView extends
  React.PureComponent<Props & StyleProps, State> {
  public state: State = {
  };

  public render(): JSX.Element {
    const { classes, showNutrients, onClose } = this.props;

    return (
      <Paper className={classes.productDialogToolbar}>

          <FormControlLabel
            classes={{
              label: classes.checkboxCaption,
            }}
            control={
              <Checkbox
                checked={showNutrients}
                color="default"
                onChange={this.nutrientsCheckboxChange}
                classes={{
                  root: classes.checkbox,
                }}
              />
            }
            label="Nutrients"
          />

          <GcClickableItem
            className={classes.productDialogToolbarButton}
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon />
          </GcClickableItem>
        </Paper>
    );
  }

  private nutrientsCheckboxChange = () =>
    this.props.onChangeRemoteSettings(usu.setShowNutrients(!this.props.showNutrients))
}

export const GcProductListDialogHeaderViewStyled =
  withStyles(stylesCallback)(GcProductListDialogHeaderView);
