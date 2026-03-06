import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import {
    Product,
    productUtils as pu,
    toSeoUrl,
} from '../../../../../web-ui/src/shared';
import { GcProductImage } from '../../gc-product-image/gc-product-image';
import { ClassKey, stylesCallback } from './gc-similar-product.style';

interface GcSimilarProductProps {
    product: Product;
    classes: Record<ClassKey, string>;
}

const GcSimilarProductView: React.SFC<GcSimilarProductProps> = (
    {product, classes},
) => {

    return (
        <a
            key={product.id}
            href={toSeoUrl(product.name)}
            className={classes.productLink}
        >
            <div className={classes.productContainer}>
                <GcProductImage
                    height={75}
                    width={150}
                    image={product.image}
                    thumbnail={product.thumb || pu.defImageThumbnail}
                    className={classes.productImageRoot}
                />
                <Typography className={classes.productName}>
                    {product.name}
                </Typography>
            </div>
        </a>
    );
};

export const GcSimilarProduct =
    withStyles(stylesCallback, {withTheme: true})(GcSimilarProductView);
