import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import ClearIcon from '@material-ui/icons/Clear';
import DatePicker from 'material-ui-pickers/DatePicker';
import * as React from 'react';
import { csn, dateUtils, LogEvent } from '../../../shared';
import { apiCall } from '../../../utils/request.utils';
import { GcClickableItem } from '../../shared';
import { StyleProps, stylesCallback } from './gc-event-logs.styles';
import { Props } from './gc-event-logs.types';

interface State {
  loadedEvents: Array<LogEvent>;
  loading: boolean;
  page: number;
  rowsPerPage: number;
  orderBy: ColumnId;
  orderDirection: 'asc' | 'desc';
  filterById: string;
  filterByName: string;
  filterByDateFrom: Date | null;
  filterByDateTo: Date | null;
}

interface Column {
  id: ColumnId;
  caption: string;
}

type ColumnId = keyof LogEvent;

const COLUMNS: Array<Column> = [
  { id: 'id', caption: 'ID' },
  { id: 'event', caption: 'Event' },
  { id: 'creationTime', caption: 'Date' },
];

class GcEventLogsView extends
  React.Component<Props & StyleProps, State> {

  public state: State = {
    loadedEvents: [],
    loading: true,
    page: 0,
    rowsPerPage: 100,
    orderBy: 'creationTime',
    orderDirection: 'desc',
    filterById: '',
    filterByName: '',
    filterByDateFrom: null,
    filterByDateTo: null,
  };

  public componentDidMount() {
    this.getLogEvents();
  }

  public render(): JSX.Element {
    const { classes } = this.props;
    const { loadedEvents, loading, page, rowsPerPage, filterByName, filterById, filterByDateFrom,
      filterByDateTo } = this.state;

    return (
      <Paper className={classes.paper}>
        {loading &&
          <div className={classes.progressRoot}>
            <CircularProgress className={classes.progress} />
          </div>
        }
        {!loading &&
          <Table>
            <TableHead className={classes.head}>
              <TableRow>
                {COLUMNS.map(this.renderHeadRow)}
              </TableRow>
              <TableRow>
                <TableCell>
                  <Input
                    value={filterById}
                    className={classes.filterField}
                    onChange={this.handleFilterById}
                    endAdornment={
                      filterById
                        ?
                        <InputAdornment position="end">
                          <IconButton
                            className={classes.clearButton}
                            onClick={this.handleClearFilterByIdClick}
                          >
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                        : ''
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={filterByName}
                    className={classes.filterField}
                    onChange={this.handleFilterByName}
                    endAdornment={
                      filterByName
                        ?
                        <InputAdornment position="end">
                          <IconButton
                            className={classes.clearButton}
                            onClick={this.handleClearFilterByNameClick}
                          >
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                        : ''
                    }
                  />
                </TableCell>
                <TableCell>
                  <DatePicker
                    value={filterByDateFrom}
                    label="From"
                    disableFuture={true}
                    autoOk={true}
                    showTodayButton={true}
                    format="yyyy-MM-dd HH:mm:ss"
                    onChange={this.handleFilterByDateFrom}
                    InputProps={{
                      classes: {
                        input: classes.dateText,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <GcClickableItem
                            onClick={this.handleClearFilterByDateFromClick}
                          >
                            {filterByDateFrom && <ClearIcon />}
                          </GcClickableItem>
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      classes: {
                        formControl: classes.dateText,
                      },
                    }}
                  />
                  <DatePicker
                    className={classes.datePickerTo}
                    value={filterByDateTo}
                    label="To"
                    disableFuture={true}
                    autoOk={true}
                    showTodayButton={true}
                    format="yyyy-MM-dd HH:mm:ss"
                    onChange={this.handleFilterByDateTo}
                    InputProps={{
                      classes: {
                        input: classes.dateText,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <GcClickableItem
                            onClick={this.handleClearFilterByDateToClick}
                          >
                            {filterByDateTo && <ClearIcon />}
                          </GcClickableItem>
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      classes: {
                        formControl: classes.dateText,
                      },
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.body}>
              {this.getEvents().map(this.renderEventRow)}
            </TableBody>
            <TableFooter className={classes.footer}>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={loadedEvents.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  rowsPerPageOptions={[25, 50, 100, 1000]}
                />
              </TableRow>
            </TableFooter>
          </Table>
        }
      </Paper>
    );
  }

  private renderHeadRow = (column: Column): JSX.Element => {
    const { classes } = this.props;
    const { orderBy, orderDirection } = this.state;

    return (
      <TableCell
        key={column.id}
        className={csn(
          classes[column.id],
          classes[column.id + 'Column'],
        )}
      >
        <TableSortLabel
          active={orderBy === column.id}
          direction={orderDirection}
          onClick={this.handleSortClick(column.id)}
        >
          {column.caption}
        </TableSortLabel>
      </TableCell>
    );
  }

  private renderEventRow = (event: LogEvent, index: number): JSX.Element => {
    const { classes } = this.props;

    return (
      <TableRow
        key={index}
        hover={true}
      >
        {COLUMNS.map((column) => (
          <TableCell
            key={column.id}
            className={csn(
              classes[column.id],
              classes[column.id + 'Column'],
            )}
          >
            {event[column.id]}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  private getEvents = (): Array<LogEvent> => {
    const { loadedEvents, page, rowsPerPage, filterById, filterByName, filterByDateFrom,
      filterByDateTo } = this.state;

    const events = filterById || filterByName || filterByDateFrom || filterByDateTo
      ? this.filterEvents(loadedEvents)
      : loadedEvents;

    this.sortEvents(events);

    const finalEvents: Array<LogEvent> = [];
    events.slice(page * rowsPerPage, (page + 1) * rowsPerPage).forEach((value) => {
      finalEvents.push(value);
    });

    return finalEvents;
  }

  private getLogEvents = async () => {
    try {
      const events = (await apiCall('GET', 'logEvents').toPromise()).response.map(
        (event: LogEvent) => ({
          ...event,
          creationTime: dateUtils.timestampToIsoString(event.creationTime, 'yyyy-MM-dd hh:MM:ss'),
        }));

      this.setState({loadedEvents: events, loading: false});
    } catch (e) {
      this.setState({loading: false});
      this.props.showPopupMessage({ text: e.message });
    }
  }

  private filterEvents = (events: Array<LogEvent>): Array<LogEvent> => {
    const { filterById, filterByName, filterByDateFrom, filterByDateTo } = this.state;

    return events.filter((value) => {
      if (filterById && !value.event.toUpperCase().includes(filterById.toUpperCase())) {
        return false;
      }

      if (filterByName && !value.event.toUpperCase().includes(filterByName.toUpperCase())) {
        return false;
      }

      if (filterByDateFrom && dateUtils.isBefore(dateUtils.getDate(value.creationTime), filterByDateFrom)) {
        return false;
      }

      if (filterByDateTo && dateUtils.isAfter(dateUtils.getDate(value.creationTime), filterByDateTo)) {
        return false;
      }

      return true;
    });
  }

  private sortEvents(events: Array<LogEvent>) {
    const { orderBy, orderDirection } = this.state;

    events.sort((a, b) => {
      const orderBy1 = a[orderBy] as any; // tslint:disable-line:no-any
      const orderBy2 = b[orderBy] as any; // tslint:disable-line:no-any

      if (typeof (orderBy1) === 'string' && typeof (orderBy2) === 'string') {
        return orderDirection === 'desc'
          ? orderBy2.localeCompare(orderBy1)
          : orderBy1.localeCompare(orderBy2);
      }

      if (typeof (orderBy1) === 'number' && typeof (orderBy2) === 'number') {
        return orderDirection === 'desc' ? orderBy2 - orderBy1 : orderBy1 - orderBy2;
      }

      return orderDirection === 'desc'
        ? orderBy2 < orderBy1 ? -1 : 1
        : orderBy1 < orderBy2 ? -1 : 1;
    });
  }

  private handleSortClick = (id: ColumnId) => () => {
    const { orderDirection } = this.state;

    this.setState({
      orderBy: id,
      orderDirection: orderDirection === 'asc' ? 'desc' : 'asc',
    });
  }

  private handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, page: number) => {
    this.setState({ page });
  }

  private handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
  }

  private handleFilterById = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterById: event.target.value });
  }

  private handleClearFilterByIdClick = () => this.setState({ filterById: '' });

  private handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterByName: event.target.value });
  }

  private handleClearFilterByNameClick = () => this.setState({ filterByName: '' });

  private handleFilterByDateFrom = (date: Date) => {
    this.setState({ filterByDateFrom: dateUtils.getStartOfDay(date) });
  }

  private handleClearFilterByDateFromClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ filterByDateFrom: null });
  }

  private handleFilterByDateTo = (date: Date) => {
    this.setState({ filterByDateTo: dateUtils.getEndOfDay(date) });
  }

  private handleClearFilterByDateToClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ filterByDateTo: null });
  }

}

export const GcEventLogsViewStyled =
  withStyles(stylesCallback)(GcEventLogsView);
