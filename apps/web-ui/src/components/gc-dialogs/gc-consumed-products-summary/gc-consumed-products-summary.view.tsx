import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import memoizeOne from 'memoize-one';
import * as React from 'react';
import { Transition } from 'react-transition-group';
import { GcClickableItem, GcSortSelector } from '../..';
import { ConsumedProductSummary, GcConsumedProductsSummaryCollage } from '../..';
import { dateUtils, DayInfo, Product, PRODUCT_NAME, SortBy, SortOptions } from '../../../shared';
import { SortDirection } from '../../../shared/types/sort-selector.types';
import {
  calculateTotalConsumedNutrients,
  getConsumedProductsSummary,
  sortConsumedProducts,
} from '../../../shared/utils/consumed-products-summary.utils';
import { logRender } from '../../../utils';
import { apiCall } from '../../../utils/request.utils';
import { GcDateSelectorViewStyled } from '../../gc-date-selector/gc-date-selector.view';
import { GcConsumedProductViewStyled } from './gc-consumed-product/gc-consumed-product.view';
import { StyleProps, stylesCallback } from './gc-consumed-products-summary.styles';
import { Props } from './gc-consumed-products-summary.types';
import { GcTotalsViewStyled } from './gc-totals/gc-totals.view';

interface State {
  dateFrom: Date | null;
  dateTo: Date | null;
  sortBy: SortBy;
  sortDirection: SortDirection;
  days: Array<DayInfo>;
  isLoading: boolean;
  errorWhileLoadingDays: string | null;
  shareVisible?: boolean;
}

const getConsumedProductsMemorized = memoizeOne(getConsumedProductsSummary);
const calculateTotalConsumedNutrientsMemorized = memoizeOne(calculateTotalConsumedNutrients);
const sortConsumedProductsMemorized = memoizeOne(sortConsumedProducts);

class GcConsumedProductsSummaryView extends React.PureComponent<Props & StyleProps, State> {

  public state: State = {
    dateFrom: null,
    dateTo: null,
    sortBy: PRODUCT_NAME,
    sortDirection: 'asc',
    days: [],
    isLoading: true,
    errorWhileLoadingDays: null,
  };

  public render() {
    logRender(this);

    const { classes, open, currency } = this.props;
    const { isLoading, errorWhileLoadingDays, sortBy, sortDirection, dateFrom, dateTo } = this.state;

    return (
      <Dialog
        classes={{
          paper: classes.dialogPaper,
        }}
        open={open}
        onClose={this.onClose}
        onBackdropClick={this.onClose}
        TransitionComponent={Slide}
        // tslint:disable-next-line: no-any
        TransitionProps={{ direction: 'up' } as any} // for some reason TransitionProps def is incomplete
        disableBackdropClick={true}
      >
        {open &&
          <div className={classes.root}>
            {this.renderToolbar()}
            <div className={classes.filterContainer}>
              <GcSortSelector
                options={SortOptions}
                selectedOption={sortBy}
                selectedDirection={sortDirection}
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
                <>
                  <div className={classes.totalContainer}>
                    <GcTotalsViewStyled
                      consumedProducts={this.getConsumedProducts()}
                      currency={currency}
                      onFacebookClick={this.openShareDialog}
                    />
                  </div>
                  <div className={classes.productsContainer}>
                    {this.getConsumedProducts().map(this.renderConsumedProduct)}
                  </div>
                  {this.renderShareDialog()}
                </>
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
            Consumed Food Summary
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

  private renderConsumedProduct = (product: ConsumedProductSummary) => (
    <GcConsumedProductViewStyled
      key={product.id}
      product={product}
      totalConsumed={calculateTotalConsumedNutrientsMemorized(this.getConsumedProducts())}
      currency={this.props.currency}
      onSetPriceClicked={this.handleSetPriceClick}
    />
  )

  private renderShareDialog = () => (
    <GcConsumedProductsSummaryCollage
      key={'share-dialog'}
      open={Boolean(this.state.shareVisible)}
      dateFrom={this.state.dateFrom!!}
      dateTo={this.state.dateTo!!}
      totalConsumed={calculateTotalConsumedNutrientsMemorized(this.getConsumedProducts())}
      products={this.getConsumedProducts()}
      onClose={this.closeShareDialog}
      TransitionComponent={Transition}
    />
  )

  private openShareDialog = () => this.setState({ shareVisible: true });

  private closeShareDialog = () => this.setState({ shareVisible: false });

  private handleSetPriceClick = (productId: Product['id']) => {
    this.props.onShowPricesDialog(productId);
  }

  private getConsumedProducts = (): Array<ConsumedProductSummary> => {
    const { products, prices } = this.props;
    const { days, dateFrom, dateTo, sortBy, sortDirection } = this.state;

    const consumedProducts = getConsumedProductsMemorized(products, prices, days, dateFrom!, dateTo!);

    sortConsumedProductsMemorized(consumedProducts, sortBy, sortDirection);

    return consumedProducts;
  }

  private loadDays = async (from: Date, to: Date) => {
    await apiCall(
      'GET',
      'days',
      { from: dateUtils.getFormattedDate(from), to: dateUtils.getFormattedDate(to) },
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
    this.setState({
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
    this.props.onClose();
  }

}

export const GcConsumedProductsSummaryViewStyled =
  withStyles(stylesCallback)(GcConsumedProductsSummaryView);
