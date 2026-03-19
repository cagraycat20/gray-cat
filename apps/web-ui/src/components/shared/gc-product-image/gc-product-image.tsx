import {
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import {
  Product,
  productHelper as ph,
} from '../..';
import { csn } from '../../../shared';

export type ClassKey = 'root' | 'img' | 'imgHidden';
type StyleProps = WithStyles<ClassKey>;

const stylesCallback: StyleRulesCallback<ClassKey> = (theme) => ({
  root: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  img: {
    objectFit: 'cover',
    maxHeight: '100%',
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    transition: theme.transitions.create('opacity', {duration: '0.5s'}),
  },
  imgHidden: {
    opacity: 0,
  },
});

export interface Props {
  thumbnail: Product['thumb'];
  image: Product['image'];
  productName: Product['name'];
  className?: string;
  width: number;
  height: number;
}

export interface State {
  loaded?: boolean;
}

class GcProductImageView extends
  React.PureComponent<Props & StyleProps, State> {
  public state: State = {
  };

  public render(): JSX.Element | null {
    const { image, thumbnail, productName, classes,
      className, height, width } = this.props;
    const { loaded } = this.state;

    return (
      <div
        className={csn(className, classes.root)}
        style={{
          backgroundImage: ph.getProductThumbnail(thumbnail || ph.defImageThumbnail),
        }}
      >
        <img
          className={csn(
            classes.img,
            {[classes.imgHidden]: !loaded},
          )}
          alt={productName}
          src={ph.getProductImageOrGeneric(image, width, height)}
          onLoad={this.afterLoad}
        />
      </div>
    );
  }

  private afterLoad = () => this.setState({loaded: true});
}

export const GcProductImageStyled =
  withStyles(stylesCallback)(GcProductImageView);
