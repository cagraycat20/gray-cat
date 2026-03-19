import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import * as React from 'react';
import { csn } from '../../shared';
import { SortDirection, SortOption } from '../../shared/types/sort-selector.types';
import { StyleProps, stylesCallback } from './gc-sort-selector.styles';

interface OwnProps {
  options: Array<SortOption>;
  selectedOption: string;
  selectedDirection: SortDirection;
  sortByTitle: string;
  labelWidth: number;
  className?: string;
  onSortChanged: (key: string, direction: SortDirection) => void;
}

class GcSortSelectorView extends React.PureComponent<OwnProps & StyleProps> {

  public render() {
    const { classes, className, options, selectedOption, selectedDirection, sortByTitle, labelWidth } = this.props;

    return (
      <div className={csn(classes.container)}>
        <FormControl
          variant="outlined"
          className={className}
        >
          <InputLabel>{sortByTitle}</InputLabel>
          <Select
            value={selectedOption}
            onChange={this.handleSortFieldChange}
            className={classes.fieldSelect}
            classes={{
              select: classes.selectElement,
              icon: classes.selectIcon,
            }}
            input={
              <OutlinedInput labelWidth={labelWidth} />}
          >
            {options.map(this.renderOption)}
          </Select>
          <div className={classes.directionButtonContainer}>
            <Button
              className={classes.directionButton}
              onClick={this.handleSortDirectionClick}
              classes={{
                label: csn(classes.directionButtonLabel),
              }}
            >
              {selectedDirection === 'asc'
                ? <ArrowUpwardIcon />
                : <ArrowDownwardIcon />
              }
              {selectedDirection === 'asc' ? 'Asc' : 'Desc'}
            </Button>
          </div>
        </FormControl>
      </div>
    );
  }

  private renderOption = (option: SortOption): JSX.Element => {
    const { key, title } = option;
    return (
      <MenuItem
        key={key}
        value={key}
      >
        {title}
      </MenuItem>
    );
  }

  private handleSortFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onSortChanged(event.target.value, this.props.selectedDirection);
  }

  private handleSortDirectionClick = () => {
    this.props.onSortChanged(this.props.selectedOption, this.props.selectedDirection === 'asc' ? 'desc' : 'asc' );
  }

}

export const GcSortSelectorViewStyled = withStyles(stylesCallback)(GcSortSelectorView);
