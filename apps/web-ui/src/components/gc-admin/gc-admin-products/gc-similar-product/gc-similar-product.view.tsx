import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { Product } from '../../../../types';
import { GcProductImage } from '../../../shared';
import { ClassKey, stylesCallback } from './gc-similar-product.style';

interface GcSimilarProductProps {
  product: Product;
  onClick: () => void;
  classes: Record<ClassKey, string>;
}

const GcSimilarProductView: React.SFC<GcSimilarProductProps> = (
  { product, onClick, classes },
) => {

  return (
    <div
      key={product.id}
      className={classes.productContainer}
      onClick={onClick}
    >
      <GcProductImage
        height={75}
        width={150}
        image={product.image}
        thumbnail={product.thumb}
        productName={product.name}
        className={classes.imageRoot}
      />
      <Typography className={classes.productName}>
        {product.name}
      </Typography>
    </div>
  );
};

export const GcSimilarProduct =
  withStyles(stylesCallback, { withTheme: true })(GcSimilarProductView);
