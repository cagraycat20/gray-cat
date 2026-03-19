import Checkbox from '@material-ui/core/Checkbox';
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
import { csn, dateUtils, User } from '../../../shared';
import { apiCall } from '../../../utils/request.utils';
import { GcClickableItem } from '../../shared';
import { StyleProps, stylesCallback } from './gc-users.styles';
import { Props } from './gc-users.types';

interface State {
  loadedUsers: Array<User>;
  loading: boolean;
  page: number;
  rowsPerPage: number;
  orderBy: ColumnId;
  orderDirection: 'asc' | 'desc';
  filterById: string;
  filterByIsAdmin: boolean;
  filterByCreationDateFrom: Date | null;
  filterByCreationDateTo: Date | null;
  filterByLastActivityFrom: Date | null;
  filterByLastActivityTo: Date | null;
}

interface Column {
  id: ColumnId;
  caption: string;
}

type ColumnId = keyof User;

const COLUMNS: Array<Column> = [
  { id: 'userId', caption: 'ID' },
  { id: 'isAdmin', caption: 'Admin' },
  { id: 'creationTime', caption: 'Registered' },
  { id: 'lastUpdateTime', caption: 'Last Activity' },
];

class GcUsersView extends
  React.Component<Props & StyleProps, State> {

  public state: State = {
    loadedUsers: [],
    loading: true,
    page: 0,
    rowsPerPage: 100,
    orderBy: 'creationTime',
    orderDirection: 'desc',
    filterById: '',
    filterByIsAdmin: false,
    filterByCreationDateFrom: null,
    filterByCreationDateTo: null,
    filterByLastActivityFrom: null,
    filterByLastActivityTo: null,
  };

  public componentDidMount() {
    this.loadUsers();
  }

  public render(): JSX.Element {
    const { classes } = this.props;
    const { loadedUsers, loading, page, rowsPerPage, filterById, filterByIsAdmin,
      filterByCreationDateFrom, filterByCreationDateTo, filterByLastActivityFrom, filterByLastActivityTo } = this.state;

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
                    className={csn(classes.filterField, classes.filterText)}
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
                <TableCell className={csn(classes.isAdminColumn, classes.isAdminFilter)}>
                  <Checkbox
                    checked={filterByIsAdmin}
                    onChange={this.handleFilterByIsAdmin}
                  />
                </TableCell>
                <TableCell className={classes.creationTimeColumn}>
                  <DatePicker
                    value={filterByCreationDateFrom}
                    label="From"
                    disableFuture={true}
                    autoOk={true}
                    showTodayButton={true}
                    format="yyyy-MM-dd"
                    onChange={this.handleFilterByCreationDateFrom}
                    InputProps={{
                      classes: {
                        input: classes.filterText,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <GcClickableItem
                            onClick={this.handleClearFilterByCreationDateFromClick}
                          >
                            {filterByCreationDateFrom && <ClearIcon />}
                          </GcClickableItem>
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      classes: {
                        formControl: classes.filterText,
                      },
                    }}
                  />
                  <DatePicker
                    className={classes.datePickerTo}
                    value={filterByCreationDateTo}
                    label="To"
                    disableFuture={true}
                    autoOk={true}
                    showTodayButton={true}
                    format="yyyy-MM-dd"
                    onChange={this.handleFilterByCreationDateTo}
                    InputProps={{
                      classes: {
                        input: classes.filterText,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <GcClickableItem
                            onClick={this.handleClearFilterByCreationDateToClick}
                          >
                            {filterByCreationDateTo && <ClearIcon />}
                          </GcClickableItem>
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      classes: {
                        formControl: classes.filterText,
                      },
                    }}
                  />
                </TableCell>
                <TableCell className={classes.lastUpdateTimeColumn}>
                  <DatePicker
                    value={filterByLastActivityFrom}
                    label="From"
                    disableFuture={true}
                    autoOk={true}
                    showTodayButton={true}
                    format="yyyy-MM-dd"
                    onChange={this.handleFilterByLastActivityFrom}
                    InputProps={{
                      classes: {
                        input: classes.filterText,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <GcClickableItem
                            onClick={this.handleClearFilterByLastActivityFromClick}
                          >
                            {filterByLastActivityFrom && <ClearIcon />}
                          </GcClickableItem>
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      classes: {
                        formControl: classes.filterText,
                      },
                    }}
                  />
                  <DatePicker
                    className={classes.datePickerTo}
                    value={filterByLastActivityTo}
                    label="To"
                    disableFuture={true}
                    autoOk={true}
                    showTodayButton={true}
                    format="yyyy-MM-dd"
                    onChange={this.handleFilterByLastActivityTo}
                    InputProps={{
                      classes: {
                        input: classes.filterText,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <GcClickableItem
                            onClick={this.handleClearFilterByLastActivityToClick}
                          >
                            {filterByLastActivityTo && <ClearIcon />}
                          </GcClickableItem>
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      classes: {
                        formControl: classes.filterText,
                      },
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.body}>
              {this.getUsers().map(this.renderUserRow)}
            </TableBody>
            <TableFooter className={classes.footer}>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={loadedUsers.length}
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
        className={classes[column.id + 'Column']}
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

  private renderUserRow = (user: User): JSX.Element => {
    const { classes } = this.props;

    return (
      <TableRow
        key={user.userId}
        hover={true}
      >
        {COLUMNS.map((column) => (
          <TableCell
            key={column.id}
            className={classes[column.id + 'Column']}
          >
            {this.renderUserValue(user, column.id)}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  private renderUserValue(user: User, columnId: ColumnId): string {
    if (columnId === 'isAdmin') {
      return user.isAdmin ? 'Yes' : 'No';
    }
    return user[columnId].toString();
  }

  private getUsers = (): Array<User> => {
    const { loadedUsers, page, rowsPerPage, filterById, filterByIsAdmin, filterByCreationDateFrom,
      filterByCreationDateTo, filterByLastActivityFrom, filterByLastActivityTo } = this.state;

    const users = filterById || filterByIsAdmin || filterByCreationDateFrom || filterByCreationDateTo
      || filterByLastActivityFrom || filterByLastActivityTo
      ? this.filterUsers(loadedUsers)
      : loadedUsers;

    this.sortUsers(users);

    const finalUsers: Array<User> = [];
    users.slice(page * rowsPerPage, (page + 1) * rowsPerPage).forEach((value) => {
      finalUsers.push(value);
    });

    return finalUsers;
  }

  private loadUsers = async () => {
    try {
      const users = (await apiCall('GET', 'admin/users').toPromise()).response.map(
        (user: User) => ({
          ...user,
          creationTime: user.creationTime ? dateUtils.timestampToIsoString(user.creationTime) : '',
          lastUpdateTime: user.lastUpdateTime ? dateUtils.timestampToIsoString(user.lastUpdateTime) : '',
        }));

      this.setState({loadedUsers: users, loading: false});
    } catch (e) {
      this.setState({loading: false});
      this.props.showPopupMessage({ text: e.message });
    }
  }

  private filterUsers = (events: Array<User>): Array<User> => {
    const { filterById, filterByIsAdmin, filterByCreationDateFrom, filterByCreationDateTo,
      filterByLastActivityFrom, filterByLastActivityTo } = this.state;

    return events.filter((value) => {
      if (filterById && !value.userId.toUpperCase().includes(filterById.toUpperCase())) {
        return false;
      }

      if (filterByIsAdmin && !value.isAdmin) {
        return false;
      }

      if (filterByCreationDateFrom
        && dateUtils.isBefore(dateUtils.getDate(value.creationTime), filterByCreationDateFrom)
      ) {
        return false;
      }

      if (filterByCreationDateTo && dateUtils.isAfter(dateUtils.getDate(value.creationTime), filterByCreationDateTo)) {
        return false;
      }

      if (filterByLastActivityFrom
        && dateUtils.isBefore(dateUtils.getDate(value.lastUpdateTime), filterByLastActivityFrom)
      ) {
        return false;
      }

      if (filterByLastActivityTo
        && dateUtils.isAfter(dateUtils.getDate(value.lastUpdateTime), filterByLastActivityTo)
      ) {
        return false;
      }

      return true;
    });
  }

  private sortUsers(events: Array<User>) {
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

  private handleFilterByCreationDateFrom = (date: Date) => {
    this.setState({ filterByCreationDateFrom: dateUtils.getStartOfDay(date) });
  }

  private handleClearFilterByCreationDateFromClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ filterByCreationDateFrom: null });
  }

  private handleFilterByCreationDateTo = (date: Date) => {
    this.setState({ filterByCreationDateTo: dateUtils.getEndOfDay(date) });
  }

  private handleClearFilterByCreationDateToClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ filterByCreationDateTo: null });
  }

  private handleFilterByLastActivityFrom = (date: Date) => {
    this.setState({ filterByLastActivityFrom: dateUtils.getStartOfDay(date) });
  }

  private handleClearFilterByLastActivityFromClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ filterByLastActivityFrom: null });
  }

  private handleFilterByLastActivityTo = (date: Date) => {
    this.setState({ filterByLastActivityTo: dateUtils.getEndOfDay(date) });
  }

  private handleClearFilterByLastActivityToClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ filterByLastActivityTo: null });
  }

  private handleFilterByIsAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterByIsAdmin: event.target.checked });
  }

}

export const GcUsersViewStyled =
  withStyles(stylesCallback)(GcUsersView);
