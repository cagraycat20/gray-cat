import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import { StoreState } from '..';
import { showPopupMessage } from '../../actions';
import {
  productHelper as ph,
  shareOnFacebook,
} from '../../utils';
import { CollageDayInfo } from '../../utils/collage.utils';
import {
  OwnProps,
  ReduxDispatchProps,
  ReduxStateProps,
} from './gc-collage.types';
import { GcCollageViewStyled } from './gc-collage.view';

function mapStateToProps(state: StoreState, ownProps: OwnProps): ReduxStateProps {
  const currentDate = state.localSettings.selectedDate;
  const currentDay = state.days.find((dayIter) => dayIter.date === currentDate);
  if (currentDay) {
    const products: CollageDayInfo['products'] = currentDay.consumed.reduce(
      (result: CollageDayInfo['products'], iter) => {
        const product = ph.findProduct(state.products, iter.productId);
        if (product) {
          let collageImages: Array<string> = [];

          // if product is complex we should extract images from ingredients
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
            time: iter.time || 0,
            productWeight: iter.productWeight,
            collageImages: collageImages.filter((img) => !!img),
          });
        }
        return result;
      },
      [],
    );

    return {
      info: {
        date: currentDate,
        nutrients: ph.addUpNutrients(currentDay.consumed, state.products),
        products,
      },
    };
  } else {
    return {};
  }
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ReduxDispatchProps {
  return {
    onError: (text) => {
      dispatch(showPopupMessage({text}));
    },
    onShare: shareOnFacebook,
  };
}

export const GcCollageContainer =
  connect(
  mapStateToProps,
  mapDispatchToProps,
)(GcCollageViewStyled);
