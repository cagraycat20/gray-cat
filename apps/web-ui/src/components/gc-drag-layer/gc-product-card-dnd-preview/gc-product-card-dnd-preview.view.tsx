import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import {
  logRender,
  productHelper as ph,
} from '../..';
import { csn } from '../../../shared';
import {
  StyleProps,
  stylesCallback,
} from './gc-product-card-dnd-preview.styles';
import { Props } from './gc-product-card-dnd-preview.types';

export interface State {
}

class GcProductCardDndPreviewView extends
  React.PureComponent<Props & StyleProps, State> {
  public state: State = {
  };

  public render(): JSX.Element | null {
    logRender(this);
    const { classes, product, fromMeal } = this.props;

    return product
    ? (
      <Card
        className={csn(
          classes.card, fromMeal ? classes.cardSize : classes.smallCardSize,
        )}
      >
        <div className={classes.header}>
          <Typography
            className={classes.name}
            variant="caption"
            noWrap={true}
          >
            {product.name}
          </Typography>
        </div>
        <CardMedia
          className={classes.media}
          image={ph.getProductImageOrGeneric(product.image, 300, 300)}
        />
      </Card>
    )
    : null;
  }
}

export const GcProductCardDndPreviewViewStyled =
  withStyles(stylesCallback)(GcProductCardDndPreviewView);
