import * as React from 'react';
import { logError, productHelper, upsError } from '../../utils';
import {
  HocProps,
  Props,
} from './gc-edit-product-dialog.types';
import { GcEditProductDialogViewStyled } from './gc-edit-product-dialog.view';

export class GcEditProductDialogHoc extends React.PureComponent<HocProps> {
  public render() {
    return (
      <GcEditProductDialogViewStyled
        {...this.props}
        onSubmit={this.submit}
      />
    );
  }

  public submit: Props['onSubmit'] = async (product, complete) => {
    try {
      this.props.onPostProductComplete(
        await productHelper.postProduct(product),
      );
      this.props.onClose();
    } catch (e) {
      logError(e);
      this.props.onError(upsError);
    }
    complete();
  }
}
