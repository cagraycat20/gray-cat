import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { StoreState } from '../../..';
import { showPopupMessage } from '../../../../actions';
import { productHelper as ph, shareConsumedProductsSummaryOnFacebook } from '../../../../utils';
import { canvasSize, CollageConsumedProductsSummary } from '../../../../utils/collage.utils';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-collage.types';
import { GcCollageViewStyled } from './gc-collage.view';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  const products: CollageConsumedProductsSummary['products'] = ownProps.products.reduce(
    (result: CollageConsumedProductsSummary['products'], iter) => {
      const product = ph.findProduct(state.products, iter.id);

      if (product) {
        let collageImages: Array<string> = [];

        // If product is complex, we should extract images from ingredients
        if (product.ingredients && product.ingredients.length > 0) {
          collageImages = product.ingredients.map((el) => {
            const ingProduct = ph.findProduct(state.products, el.productId);
            return (ingProduct && (ingProduct.image || '')) || '';
          });
        } else {
          collageImages = [product.image || ''];
        }

        result.push({
          product: {...product},
          productWeight: iter.weight,
          collageImages: collageImages.filter((img) => !!img),
        });
      }

      return result;
    },
    [],
  );

  return {
    info: {
      dateFrom: ownProps.dateFrom,
      dateTo: ownProps.dateTo,
      totalConsumed: ownProps.totalConsumed,
      products,
    },
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>, ownProps: OwnProps): ReduxDispatchProps {
  const { dateFrom, dateTo, totalConsumed } = ownProps;

  return {
    onError: (text) => {
      dispatch(showPopupMessage({text}));
    },
    onShare: (image: string, products: CollageConsumedProductsSummary['products']) => {
      return shareConsumedProductsSummaryOnFacebook({
        dateFrom,
        dateTo,
        image,
        imageSize: canvasSize,
        pageUrl: '',
        totalConsumed,
        products,
      });
    },
  };
}

export const GcCollageContainer =
  connect(mapStateToProps, mapDispatchToProps)(GcCollageViewStyled);
