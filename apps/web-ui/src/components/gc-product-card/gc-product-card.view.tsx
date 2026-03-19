import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import {
  DndSourceInjectedProps,
  DnDTargetViewProps,
  GcProductImage,
  GcTooltip,
  logRender,
  NutrientPropName,
  productHelper as ph,
} from '..';
import { csn } from '../../shared';
import {
  gcProductCardStylesCallback,
  StyleProps,
} from './gc-product-card.styles';
import { Props } from './gc-product-card.types';

interface State {
  nutrientsVisible: boolean;
}

class GcProductCardView extends
  React.PureComponent<
  Props &
  StyleProps &
  DndSourceInjectedProps &
  DnDTargetViewProps,
  State
> {

  public componentDidMount() {
    const { connectDragPreview } = this.props;
    if (connectDragPreview) {
      connectDragPreview(getEmptyImage(), {captureDraggingState: true});
    }
  }

  public render(): JSX.Element | null {
    logRender(this);
    const { classes, product, connectDragSource, dndIsOver, dndCanDrop,
      connectDropTarget } = this.props;
    if (!product) {
      return null;
    }

    return connectDragSource(connectDropTarget(
      <div style={{position: 'relative'}} >
        {dndIsOver && dndCanDrop && <div className={classes.dropMarker} />}
        <Card
          className={classes.card}
          onClick={this.click}
        >
          <div className={classes.nameRow}>
            <Typography
              className={classes.name}
              variant="caption"
              noWrap={true}
            >
              {product.name}
            </Typography>
          </div>

          <div className={classes.mediaContainer}>
            <GcProductImage
              className={classes.media}
              image={product.image}
              thumbnail={product.thumb}
              productName={product.name}
              width={150}
              height={75}
            />
           {this.renderNutrients()}
          </div>
        </Card>
      </div>,
    ));
  }

  private renderNutrients = () => {
    const { classes, showNutrients } = this.props;
    return (
      <div
        className={csn(
          classes.nutrients,
          {[classes.nutrientsVisible]: showNutrients},
        )}
      >
        <div className={classes.nutrientsRoot}>
          {ph.nutrientProps.map((nutrPropIter) => this.renderNutrient(nutrPropIter))}
        </div>
      </div>
    );
  }

  private renderNutrient(nutrient: NutrientPropName): JSX.Element | null {
    const {classes, theme, product} = this.props;
    if (!product) {
      return null;
    }

    return (
      <GcTooltip
        key={nutrient}
        title={ph.nutrientCaptions[nutrient] +
          (nutrient === 'calories' ? '' : ' (grams)')}
      >
        <div
          style={{ backgroundColor:
              theme.custom.colors[nutrient] +
                (!product[nutrient] ? '60' : ''),
          }}
          className={classes.nutrientContainer}
        >
          <Typography className={classes.nutrientValue}>
            {ph.formatNutrientValue(product[nutrient])}
          </Typography>
        </div>
      </GcTooltip>
    );
  }

  private click = (event: React.MouseEvent<HTMLDivElement>) => {
    const { onClick, product } = this.props;
    if (onClick && product) {
      event.preventDefault();
      onClick(event.currentTarget, product.id);
    }
  }
}

export const GcProductCardViewStyled =
  withStyles(gcProductCardStylesCallback, {withTheme: true})(GcProductCardView);
