import * as React from 'react';
import {
  Product,
  productHelper as ph,
} from '../..';

interface Props {
  filterText: string;
  products: Array<Product | undefined>;
  // tslint:disable-next-line:no-any
  onRenderProduct: (product: Product, customData?: any) => JSX.Element | null;
  onRenderExceededLimit?: () => JSX.Element;
  limit?: number;
  renderForEmptyFilter?: boolean;
  customData?: any; // tslint:disable-line:no-any
}

interface State {
}

export class GcFilteredProductsView extends
  React.PureComponent<Props, State> {
  public state: State = {
  };

  public render(): React.ReactNode {
    const { products, onRenderProduct, limit, filterText,
      onRenderExceededLimit, renderForEmptyFilter, customData } = this.props;
    let exceededLimit = false;
    const productsToRender = [];
    for (const product of products) {
      if (!product) {
        continue;
      }

      if (limit && productsToRender.length >= limit) {
        exceededLimit = true;
        break;
      } else if (
        (!filterText && renderForEmptyFilter) ||
        ph.checkFilter(product, filterText)
      ) {
        productsToRender.push(onRenderProduct(product, customData));
      }
    }
    return (
      <>
        {productsToRender.length > 0 && productsToRender}
        {
          exceededLimit &&
          onRenderExceededLimit &&
          onRenderExceededLimit()
        }
      </>
    );
  }
}
