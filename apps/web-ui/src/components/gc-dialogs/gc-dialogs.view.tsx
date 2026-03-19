import * as React from 'react';
import {
  GcCookieConsent,
  GcEditComplexProductDialog,
  // GcRoadmap,
  GcEditProductDialog,
  GcLoginOfferDialog,
  GcUnregisteredUsageWarning,
} from '..';
import auth from '../../services/Auth';
import { Props } from './gc-dialogs.types';
import {
  GcFoodComparisonDialogContainer as GcFoodComparisonDialog,
} from './gc-food-comparison-dialog/gc-food-comparison-dialog.container';
import {
  GcIntakeSugarDialogContainer as GcIntakeSugarDialog,
} from './gc-intake-sugar-dialog/gc-intake-sugar-dialog.container';
import { GcSaveMealDialogContainer as GcSaveMealDialog } from './gc-meal/gc-save-meal/gc-save-meal-dialog.container';
import {
  GcSavedMealsDialogContainer as GcSavedMealsDialog,
} from './gc-meal/gc-saved-meals/gc-saved-meals-dialog.container';
import {
  GcProductPricesDialogContainer as GcProductPricesDialog,
} from './gc-product-prices-dialog/gc-product-prices-dialog.container';

export interface State {
}

export class GcDialogsView extends
  React.PureComponent<Props, State> {
  public state: State = {
  };

  public render(): JSX.Element {
    const { notLoggedInFeatureDenial } = this.props;
    return (
      <>
          <GcEditProductDialog />
          <GcCookieConsent />
          <GcEditComplexProductDialog />
          <GcProductPricesDialog />
          <GcSaveMealDialog />
          <GcSavedMealsDialog />
          <GcFoodComparisonDialog />
          <GcIntakeSugarDialog />
          {/* <GcRoadmap /> */}
          {
            !auth.authorized &&
            <GcUnregisteredUsageWarning />
          }
          <GcLoginOfferDialog
            open={notLoggedInFeatureDenial}
            onClose={this.closeLoginOffer}
            onCancel={this.closeLoginOffer}
            title="Feature will be available after logging in"
            text={
              `Consider logging in now. It will take about 10 seconds.`
            }
          />

      </>
    );
  }

  private closeLoginOffer = () => this.props.onCloseLoginOffer();
}
