import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SendIcon from '@material-ui/icons/Send';
import * as React from 'react';
import { GcClickableItem } from '..';
import {
  StyleProps,
  stylesCallback,
} from './gc-roadmap.styles';
import { Props } from './gc-roadmap.types';

const minIdeaTextLength = 3;

const data: Array<{
  title: string;
  details: string;
}> = [
  {
    title: 'Personal categories',
    details: 'Create custom categories along with "Favorites" and "Popular"',
  },
  {
    title: 'Russian language',
    details: 'Switch between English and Russian languages',
  },
  {
    title: 'More options in Facebook integration',
    details: 'Share your week summary or full week food intake on facebook',
  },
  {
    title: 'Meal/day templates',
    details: 'Save meal and day templates to easily reuse them later or to share them with your friends',
  },
  {
    title: 'Other feature',
    details: 'Some other feature',
  },
];

export interface State {
  expanded: number;
  ideaText: string;
}

class GcRoadmapView extends
  React.PureComponent<Props & StyleProps, State> {
  public state: State = {
    expanded: -1,
    ideaText: '',
  };

  public render(): JSX.Element {
    const { classes } = this.props;
    const { expanded, ideaText } = this.state;

    return (
      <Dialog
        open={true}
      >
        <div className={classes.root}>

          <div className={classes.header}>
            <Typography
              variant="h5"
              className={classes.headerColor}
            >
              Features we currently work on
            </Typography>

            <GcClickableItem>
              <ClearIcon className={classes.headerColor} />
            </GcClickableItem>
          </div>

          <div className={classes.content}>
            {
              data.map((iter, index) => (
                <ExpansionPanel
                  expanded={expanded === index}
                  onChange={() => this.setState({
                    expanded: this.state.expanded === index ? -1 : index})}
                >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">
                      {iter.title}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>

                    <Typography>
                      {iter.details}
                    </Typography>

                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))
            }
          </div>

          <TextField
            className={classes.suggestionInput}
            label="Have an idea or a suggestion? Leave it here."
            multiline={true}
            margin="normal"
            onChange={this.ideaTextChange}
            value={ideaText}
          />

          <Button
            className={classes.suggestionSubmitButton}
            variant="contained"
            disabled={ideaText.length < minIdeaTextLength}
            onClick={this.sentIdea}
          >
            Sent
            <SendIcon className={classes.rightIcon} />
          </Button>

        </div>
      </Dialog>
    );
  }

  private sentIdea = () => this.setState({ideaText: ''});

  private ideaTextChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ideaText: event.target.value})

}

export const GcRoadmapViewStyled =
  withStyles(stylesCallback)(GcRoadmapView);
