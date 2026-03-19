import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { csn } from '../../shared';

import { productHelper } from '../../utils';
import {
  StyleProps,
  stylesCallback,
} from './gc-image-select.styles';

interface Props {
  image: string;
  mobileLayout?: boolean;
  onChange: (newImage: string) => void;
  onError: (error: string) => void;
}

interface State {
  imageUrl: string;
}

const maxFileSize = 1.5 * 1024 * 1024;

class GcImageSelectView extends React.PureComponent<Props & StyleProps, State> {
  public state: State = {
    imageUrl: '',
  };

  private inputRef = React.createRef<HTMLInputElement>();

  public render(): JSX.Element {
    const { classes, mobileLayout } = this.props;
    const { imageUrl } = this.state;
    const image = productHelper.getProductImageOrGeneric(this.props.image, 270, 150, true);

    return (
      <>
        <input
          ref={this.inputRef}
          style={{ display: 'none' }}
          type="file"
          onChange={this.imageInputChange}
          accept="image/*"
        />

        <div
          className={classes.imageContainer}
          style={{
            backgroundImage:
              `url('${image}')`,
          }}

          onDragOver={this.imageContainerDragOver}
          onDrop={this.imageContainerDrop}
        >
          <div
            className={classes.imageContainerHover}
            style={image ? undefined : { opacity: 1 }}
          >
            <Typography
              className={csn(classes.textColor, classes.imageContainerHoverText)}
              variant="h5"
            >
              Drag an image here
            </Typography>

            {
              !mobileLayout &&
              <>
                <Typography
                  className={csn(classes.textColor, classes.imageContainerHoverText)}
                  variant="subtitle1"
                >
                  or
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.selectImageClick}
                  className={classes.imageContainerHoverText}
                  classes={{
                    label: classes.imageContainerHoverButtonText,
                  }}
                >
                  Choose an image to upload
                </Button>
              </>
            }
          </div>
        </div>

        {
          mobileLayout &&
          <div className={classes.mobileButtonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.selectImageClick}
              className={classes.imageContainerHoverText}
              classes={{
                label: classes.imageContainerHoverButtonText,
              }}
            >
              Choose an image to upload
            </Button>
          </div>
        }

        <Typography
          className={classes.textLightColor}
          align="center"
          variant="subtitle1"
        >
          or use
        </Typography>

        <TextField
          className={classes.input}
          variant="outlined"
          label="Image URL"
          value={imageUrl}
          onChange={this.changeImageUrl}
          onFocus={this.imageUrlFocus}
        />
      </>
    );
  }

  private imageContainerDrop = (event: React.DragEvent<Element>) => {
    event.preventDefault();
    event.stopPropagation();
    this.loadImage(event.dataTransfer.files);
  }

  private imageContainerDragOver = (event: React.DragEvent<Element>) => {
    event.preventDefault();
    event.stopPropagation();
  }

  private selectImageClick = () => {
    if (this.inputRef.current) {
      this.inputRef.current.click();
    }
  }

  private imageUrlFocus = () => {
    if (this.state.imageUrl) {
      this.props.onChange(this.state.imageUrl);
    }
  }

  private changeImageUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imageUrl: event.target.value,
    });
    this.props.onChange(event.target.value);
  }

  private imageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.loadImage(event.target.files);
  }

  private loadImage = (files: FileList | null) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          if (reader.result.length > maxFileSize) {
            this.props.onError('Image is too large');
          } else {
            this.props.onChange(reader.result);
            this.setState({imageUrl: ''});
          }
        }
      };
    }
  }
}

export const GcImageSelect =
  withStyles(stylesCallback)(GcImageSelectView);
