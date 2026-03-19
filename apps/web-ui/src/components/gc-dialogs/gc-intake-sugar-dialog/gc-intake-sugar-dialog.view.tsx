import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import memoizeOne from 'memoize-one';
import * as React from 'react';
import { GcClickableItem, GcSortSelector } from '../..';
import { dateUtils as du, DayInfo, GcText } from '../../../shared';
import { ConsumedProduct, SortBy, SortOptions } from '../../../shared/types/intake-sugar.types';
import { SortDirection } from '../../../shared/types/sort-selector.types';
import { getConsumedProducts, sortConsumedProducts } from '../../../shared/utils/intake-sugar.utils';
import { LocalSettings } from '../../../types';
import { logRender } from '../../../utils';
import { apiCall } from '../../../utils/request.utils';
import { GcDateSelectorViewStyled } from '../../gc-date-selector/gc-date-selector.view';
import { StyleProps, stylesCallback } from './gc-intake-sugar-dialog.styles';
import { Props } from './gc-intake-sugar-dialog.types';
import { GcProductViewStyled } from './gc-product/gc-product.view';

interface State {
  dateFrom: Date | null;
  dateTo: Date | null;
  days: Array<DayInfo>;
  isLoading: boolean;
  errorWhileLoadingDays: string | null;
}

const getConsumedProductsMemorized = memoizeOne(getConsumedProducts);
const sortConsumedProductsMemorized = memoizeOne(sortConsumedProducts);

class GcIntakeSugarDialogView extends React.PureComponent<Props & StyleProps, State> {

  public state: State = {
    dateFrom: null,
    dateTo: null,
    days: [],
    isLoading: true,
    errorWhileLoadingDays: null,
  };

  public render() {
    logRender(this);

    const { classes, settings } = this.props;
    const { isLoading, errorWhileLoadingDays, dateFrom, dateTo } = this.state;

    return (
      <Dialog
        classes={{
          paper: classes.dialogPaper,
        }}
        open={settings.open}
        onClose={this.onClose}
        onBackdropClick={this.onClose}
        TransitionComponent={Slide}
        // tslint:disable-next-line: no-any
        TransitionProps={{ direction: 'up' } as any} // for some reason TransitionProps def is incomplete
        disableBackdropClick={true}
      >
        {settings.open &&
          <div className={classes.root}>
            {this.renderToolbar()}
            <div className={classes.filterContainer}>
              <GcSortSelector
                options={SortOptions}
                selectedOption={settings.sortBy}
                selectedDirection={settings.sortDirection}
                sortByTitle="Sort by"
                labelWidth={50}
                onSortChanged={this.onSortChanged}
              />
              <GcDateSelectorViewStyled
                invokeSelectedPeriod={!dateFrom || !dateTo}
                onPeriodSelected={this.onPeriodSelected}
              />
            </div>
            {isLoading
              ? <CircularProgress className={classes.progress} />
              : this.getConsumedProducts().length > 0
                ?
                <div className={classes.productsContainer}>
                  <GcText
                    className={classes.hintText}
                    custom={{ color: 'grey', size: 'small' }}
                  >
                    The amount of sugar in food is equivalent to real sugar
                  </GcText>
                  {this.getConsumedProducts().map(this.renderProduct)}
                </div>
                :
                <div className={classes.noData}>
                  <Typography
                    className={classes.noDataText}
                    variant="h6"
                  >
                    {errorWhileLoadingDays ? errorWhileLoadingDays : 'No data to display'}
                  </Typography>
                </div>
            }
          </div>
        }
      </Dialog>
    );
  }

  private renderToolbar = () => {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.topBar}>
          <Typography
            className={classes.dialogTitle}
            color="inherit"
            variant="h6"
          >
            Intake of Sugar
          </Typography>

          <GcClickableItem
            className={classes.button}
            color="inherit"
            onClick={this.onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </GcClickableItem>
        </Paper>
      </div>
    );
  }

  private renderProduct = (product: ConsumedProduct) => (
    <GcProductViewStyled
      key={product.id}
      product={product}
    />
  )

  private getConsumedProducts = (): Array<ConsumedProduct> => {
    const { products, settings } = this.props;
    const { days, dateFrom, dateTo } = this.state;

    const consumedProducts = getConsumedProductsMemorized(products, days, dateFrom!, dateTo!);

    sortConsumedProductsMemorized(consumedProducts, settings.sortBy, settings.sortDirection);

    return consumedProducts;
  }

  private loadDays = async (from: Date, to: Date) => {
    await apiCall(
      'GET',
      'days',
      { from: du.getFormattedDate(from), to: du.getFormattedDate(to) },
    )
      .toPromise()
      .then((ajaxResponse) => {
        this.setState({
          isLoading: false,
          days: Array.isArray(ajaxResponse.response) ? ajaxResponse.response : [],
          errorWhileLoadingDays: null,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          days: [],
          errorWhileLoadingDays: error.message,
        });
      });
  }

  private onSortChanged = (sortBy: string, sortDirection: SortDirection) => {
    this.changeSettings({
      sortBy: sortBy as SortBy,
      sortDirection,
    });
  }

  private onPeriodSelected = (from: Date, to: Date) => {
    this.setState({
      isLoading: true,
      dateFrom: from,
      dateTo: to,
    });

    this.loadDays(from, to);
  }

  private onClose = () => {
    this.setState({ dateFrom: null, dateTo: null });
    this.changeSettings({ open: false });
  }

  private changeSettings = (changes: Partial<LocalSettings['intakeSugarDialog']>) => {
    this.props.onChangeSettings({
      ...this.props.settings,
      ...changes,
    });
  }

}

export const GcIntakeSugarDialogViewStyled =
  withStyles(stylesCallback)(GcIntakeSugarDialogView);
