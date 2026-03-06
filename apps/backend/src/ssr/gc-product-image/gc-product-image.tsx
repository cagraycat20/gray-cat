import {
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import Helmet from 'react-helmet';
import { csn, productUtils as pu } from '../../../../web-ui/src/shared';
import { Product } from '../../types';
// @ts-ignore
import productImageScript from './gc-product-image.script';

export type ClassKey = 'root' | 'img' | 'noImage' | '@global .product-image-hidden';
type StyleProps = WithStyles<ClassKey>;

const stylesCallback: StyleRulesCallback<ClassKey> = (theme) => ({
  root: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  img: {
    objectFit: 'cover',
    transition: theme.transitions.create('opacity', {duration: '0.5s'}),
  },
  noImage: {
    opacity: 0,
  },
  ['@global .product-image-hidden']: {
    opacity: 0,
  },
});

export interface Props {
  thumbnail: Product['thumb'];
  image: Product['image'];
  className?: string;
  width: number;
  height: number;
  hideImageIfEmpty?: boolean;
}

const GcProductImageView: React.SFC<Props & StyleProps> = ({ image, thumbnail, classes,
  className, height, width, hideImageIfEmpty }) => {
  return (
    <>
      <Helmet>
        <script src={productImageScript} type="text/javascript" />
      </Helmet>
      <div
        className={csn(className, classes.root)}
        style={{
          backgroundImage: pu.getProductThumbnail(thumbnail),
        }}
      >
        {
          <img
            className={csn(
              'product-image',
              'product-image-hidden',
              classes.img,
              {[classes.noImage]: !(image || !hideImageIfEmpty)},
            )}
            src={pu.getProductImage(image, width, height)}
            width={width}
            height={height}
            alt="protomeal"
          />
        }
      </div>
    </>
  );
};

export const GcProductImage =
  withStyles(stylesCallback)(GcProductImageView);
