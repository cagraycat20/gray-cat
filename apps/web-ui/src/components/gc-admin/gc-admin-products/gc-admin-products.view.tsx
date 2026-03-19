import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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
import DeleteIcon from '@material-ui/icons/Delete';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import * as React from 'react';

import AddIcon from '@material-ui/icons/Add';
import ExportIcon from '@material-ui/icons/CloudDownload';
import ImportIcon from '@material-ui/icons/CloudUpload';
import * as FileSaver from 'file-saver';
import { Product, productHelper } from '../..';

import {
  gcAdminProductsStylesCallback,
  StyleProps,
} from './gc-admin-products.styles';

import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import memoizeOne from 'memoize-one';
import { csn } from '../../../shared';
import { csvExportProducts, csvImportProducts } from '../../../utils/csv-export-import';
import { apiCall } from '../../../utils/request.utils';
import { Props } from './gc-admin-products.types';
import { GcSimilarProduct } from './gc-similar-product/gc-similar-product.view';

interface GcRemoveProductProps {
  open: boolean;
  name: string;
  onClose: React.ReactEventHandler<{}>;
  onDelete: React.ReactEventHandler<{}>;
}

interface AdminProduct {
  product: Product;
  similarProducts: Array<Product>;
  problems?: Array<string>;
}

interface ProductsInfo {
  adminProducts: Array<AdminProduct>;
  count: number;
}

const GcRemoveProduct: React.SFC<GcRemoveProductProps> = ({ open, name, onClose, onDelete }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Remove Product "{name}"?</DialogTitle>
    <DialogActions>
      <Button color="primary" onClick={onClose}>Cancel</Button>
      <Button
        color="secondary"
        onClick={(event) => {
          onClose(event);
          onDelete(event);
        }}
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

interface State {
  page: number;
  rowsPerPage: number;
  editingProduct?: Partial<Product>;
  removingProduct?: Product;
  orderBy: ColumnId;
  orderDirection: 'asc' | 'desc';
  showOnlyInvalidProducts: boolean;
  showSimilarProducts: boolean;
  filterByImage: string;
  filterByName: string;
  filterByDescription: boolean;
  filterByCaloriesFrom: string;
  filterByCaloriesTo: string;
  filterByFatFrom: string;
  filterByFatTo: string;
  filterByCarbsFrom: string;
  filterByCarbsTo: string;
  filterByProteinFrom: string;
  filterByProteinTo: string;
  filterByKeywords: string;
  filterByProblem: string;
  filterByComment: string;
}

type ColumnId = keyof Product | 'problem';

const COLUMNS: Array<{ id: ColumnId; caption: string; numeric?: boolean }> = [
  { id: 'name', caption: 'Product (100g serving)' },
  { id: 'description', caption: 'Description' },
  { id: 'calories', caption: 'Calories (kcal)', numeric: true },
  { id: 'fat', caption: 'Fat (g)', numeric: true },
  { id: 'carbs', caption: 'Carbs (g)', numeric: true },
  { id: 'protein', caption: 'Protein (g)', numeric: true },
  { id: 'keyWords', caption: 'Key Words' },
  { id: 'comment', caption: 'Comment' },
  { id: 'problem', caption: 'Problem' },
];

class GcAdminProductsView extends
  React.Component<Props & StyleProps, State> {
  public state: State = {
    page: 0,
    rowsPerPage: 100,
    editingProduct: undefined,
    removingProduct: undefined,
    orderBy: 'name',
    orderDirection: 'asc',
    showOnlyInvalidProducts: false,
    showSimilarProducts: false,
    filterByImage: '',
    filterByName: '',
    filterByDescription: false,
    filterByCaloriesFrom: '',
    filterByCaloriesTo: '',
    filterByFatFrom: '',
    filterByFatTo: '',
    filterByCarbsFrom: '',
    filterByCarbsTo: '',
    filterByProteinFrom: '',
    filterByProteinTo: '',
    filterByKeywords: '',
    filterByProblem: '',
    filterByComment: '',
  };

  private importInput?: HTMLInputElement;

  private getProductProblemMem = memoizeOne((products: Array<Product>) => {
    const result: { [key: string]: Array<string> } = {};
    products.forEach((iter) => {
      const problems = productHelper.validateProduct(iter);
      if (problems) {
        result[iter.id] = problems;
      }
    });
    return result;
  });

  public render(): JSX.Element {
    const { classes, removeProduct, expanded } = this.props;
    const { page, rowsPerPage, removingProduct, orderBy, orderDirection, showOnlyInvalidProducts, showSimilarProducts,
      filterByImage, filterByName, filterByCaloriesFrom, filterByCaloriesTo, filterByFatFrom,
      filterByFatTo, filterByCarbsFrom, filterByCarbsTo, filterByProteinFrom, filterByProteinTo,
      filterByKeywords, filterByProblem, filterByComment, filterByDescription } = this.state;

    const productsInfo = this.getProducts();
    const adminProducts = productsInfo ? productsInfo.adminProducts : null;
    const count = productsInfo ? productsInfo.count : 0;

    return (
      <>
        <div className={classes.root}>
          <div>
            <Toolbar>
              <IconButton
                color="primary"
                onClick={this.createProduct}
              >
                <AddIcon />
              </IconButton>
              <IconButton onClick={this.exportProducts}>
                <ExportIcon />
              </IconButton>
              <IconButton onClick={() => this.importInput && this.importInput.click()}>
                <input
                  ref={(el) => {
                    if (el) {
                      this.importInput = el;
                    }
                  }}
                  style={{ display: 'none' }}
                  type="file"
                  onChange={this.importProducts}
                  accept=".csv"
                />
                <ImportIcon />
              </IconButton>
              {/* <IconButton onClick={() => this.importInput && this.importInput.click()}>
                <input
                  ref={(el) => {
                    if (el) {
                      this.importInput = el;
                    }
                  }}
                  style={{display: 'none'}}
                  type="file"
                  onChange={this.mergeFiles}
                  multiple={true}
                  accept=".csv"
                />
                <CallMergeIcon/>
              </IconButton> */}
              <IconButton onClick={this.calcPopularProducts}>
                <DonutLargeIcon />
              </IconButton>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showOnlyInvalidProducts}
                    onChange={this.handleFilterInvalidProducts}
                  />
                }
                label={'Only Invalid products'}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showSimilarProducts}
                    onChange={this.handleSimilarProductsVisibility}
                  />
                }
                label="Similar products"
              />
            </Toolbar>
            <Paper>
              <div className={csn(classes.content, {[classes.wide]: !expanded}, {[classes.short]: expanded})}>
                <Table>
                  <TableHead className={classes.head}>
                    <TableRow>
                      <TableCell className={csn(classes.imageColumn, classes.cell)}>
                        Image
                      </TableCell>
                      {COLUMNS.map((col) => (
                        (col.id !== 'problem' || showOnlyInvalidProducts)
                          ?
                          <TableCell
                            key={col.id}
                            className={csn(
                              classes[col.id],
                              classes[col.id + 'Column'],
                              classes.cell,
                            )}
                            align={col.numeric ? 'right' : undefined}
                          >
                            <TableSortLabel
                              active={orderBy === col.id}
                              direction={orderDirection}
                              onClick={() =>
                                this.setState({
                                  orderBy: col.id,
                                  orderDirection: orderDirection === 'asc' ? 'desc' : 'asc',
                                })
                              }
                            >
                              {col.caption}
                            </TableSortLabel>
                          </TableCell>
                          : null
                      ))}
                      <TableCell>Delete</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cell}>
                        <Input
                          value={filterByImage}
                          className={classes.filterField}
                          onChange={this.handleFilterByImage}
                          endAdornment={
                            filterByImage
                              ?
                              <InputAdornment position="end">
                                <IconButton
                                  className={classes.clearButton}
                                  onClick={this.handleClearFilterByImageClick}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                              : ''
                          }
                        />
                      </TableCell>
                      <TableCell className={classes.cell}>
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
                      <TableCell className={classes.cell}>
                        <Checkbox
                          checked={filterByDescription}
                          onChange={this.handleFilterByDescription}
                        />
                      </TableCell>
                      <TableCell className={classes.cell}>
                        <Input
                          value={filterByCaloriesFrom}
                          className={classes.filterField}
                          placeholder={'From'}
                          onChange={this.handleFilterByCaloriesFrom}
                          endAdornment={
                            filterByCaloriesFrom
                              ?
                              <InputAdornment position="end">
                                <IconButton
                                  className={classes.clearButton}
                                  onClick={this.handleClearFilterByCaloriesFromClick}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                              : ''
                          }
                        />
                        <Input
                          value={filterByCaloriesTo}
                          className={classes.filterField}
                          placeholder={'To'}
                          onChange={this.handleFilterByCaloriesTo}
                          endAdornment={
                            filterByCaloriesTo
                              ?
                              <InputAdornment position="end">
                                <IconButton
                                  className={classes.clearButton}
                                  onClick={this.handleClearFilterByCaloriesToClick}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                              : ''
                          }
                        />
                      </TableCell>
                      <TableCell className={classes.cell}>
                        <Input
                          value={filterByFatFrom}
                          className={classes.filterField}
                          placeholder={'From'}
                          onChange={this.handleFilterByFatFrom}
                          endAdornment={
                            filterByFatFrom
                              ?
                              <InputAdornment position="end">
                                <IconButton
                                  className={classes.clearButton}
                                  onClick={this.handleClearFilterByFatFromClick}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                              : ''
                          }
                        />
                        <Input
                          value={filterByFatTo}
                          className={classes.filterField}
                          placeholder={'To'}
                          onChange={this.handleFilterByFatTo}
                          endAdornment={
                            filterByFatTo
                              ?
                              <InputAdornment position="end">
                                <IconButton
                                  className={classes.clearButton}
                                  onClick={this.handleClearFilterByFatToClick}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                              : ''
                          }
                        />
                      </TableCell>
                      <TableCell className={classes.cell}>
                        <Input
                          value={filterByCarbsFrom}
                          className={classes.filterField}
                          placeholder={'From'}
                          onChange={this.handleFilterByCarbsFrom}
                          endAdornment={
                            filterByCarbsFrom
                              ?
                              <InputAdornment position="end">
                                <IconButton
                                  className={classes.clearButton}
                                  onClick={this.handleClearFilterByCarbsFromClick}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                              : ''
                          }
                        />
                        <Input
                          value={filterByCarbsTo}
                          className={classes.filterField}
                          placeholder={'To'}
                          onChange={this.handleFilterByCarbsTo}
                          endAdornment={
                            filterByCarbsTo
                              ?
                              <InputAdornment position="end">
                                <IconButton
                                  className={classes.clearButton}
                                  onClick={this.handleClearFilterByCarbsToClick}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                              : ''
                          }
                        />
                      </TableCell>
                      <TableCell className={classes.cell}>
                        <Input
                          value={filterByProteinFrom}
                          className={classes.filterField}
                          placeholder={'From'}
                          onChange={this.handleFilterByProteinFrom}
                          endAdornment={
                            filterByProteinFrom
                              ?
                              <InputAdornment position="end">
                                <IconButton
                                  className={classes.clearButton}
                                  onClick={this.handleClearFilterByProteinFromClick}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                              : ''
                          }
                        />
                        <Input
                          value={filterByProteinTo}
                          className={classes.filterField}
                          placeholder={'To'}
                          onChange={this.handleFilterByProteinTo}
                          endAdornment={
                            filterByProteinTo
                              ?
                              <InputAdornment position="end">
                                <IconButton
                                  className={classes.clearButton}
                                  onClick={this.handleClearFilterByProteinToClick}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                              : ''
                          }
                        />
                      </TableCell>
                      <TableCell className={classes.cell}>
                        <Input
                          value={filterByKeywords}
                          className={classes.filterField}
                          onChange={this.handleFilterByKeywords}
                          endAdornment={
                            filterByKeywords
                              ?
                              <InputAdornment position="end">
                                <IconButton
                                  className={classes.clearButton}
                                  onClick={this.handleClearFilterByKeywordsClick}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                              : ''
                          }
                        />
                      </TableCell>
                      <TableCell className={classes.cell}>
                        <Input
                          value={filterByComment}
                          className={classes.filterField}
                          onChange={this.handleFilterByComment}
                          endAdornment={
                            filterByComment
                              ?
                              <InputAdornment position="end">
                                <IconButton
                                  className={classes.clearButton}
                                  onClick={this.handleClearFilterByCommentClick}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                              : ''
                          }
                        />
                      </TableCell>
                      {showOnlyInvalidProducts
                        ?
                        <TableCell className={classes.cell}>
                          <Input
                            value={filterByProblem}
                            className={classes.filterField}
                            onChange={this.handleFilterByProblem}
                            endAdornment={
                              filterByProblem
                                ?
                                <InputAdornment position="end">
                                  <IconButton
                                    className={classes.clearButton}
                                    onClick={this.handleClearFilterByProblemClick}
                                  >
                                    <ClearIcon />
                                  </IconButton>
                                </InputAdornment>
                                : ''
                            }
                          />
                        </TableCell>
                        : null
                      }
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody className={classes.body}>
                    {adminProducts!!.map((adminProduct) => {
                      return (
                        <React.Fragment key={adminProduct.product.id}>
                          <TableRow
                            hover={true}
                            onClick={this.handleEditProduct(adminProduct.product)}
                          >
                            <TableCell
                              className={csn(
                                classes.imageColumn,
                                classes.cell,
                                showSimilarProducts ? classes.cellWithoutBorderBottom : '',
                              )}
                            >
                              <Avatar
                                src={productHelper.getProductImageOrGeneric(adminProduct.product.image, 64, 64)}
                              />
                            </TableCell>
                            {COLUMNS.map((col) => (
                              (col.id !== 'problem' || showOnlyInvalidProducts)
                                ?
                                <TableCell
                                  key={col.id}
                                  className={csn(
                                    classes[col.id],
                                    classes[col.id + 'Column'],
                                    classes.cell,
                                    showSimilarProducts ? classes.cellWithoutBorderBottom : '',
                                  )}
                                  align={col.numeric ? 'right' : undefined}
                                >
                                  {this.renderValue(col.id, adminProduct)}
                                </TableCell>
                                : null
                            ))}
                            <TableCell
                              className={csn(classes.cell, showSimilarProducts ? classes.cellWithoutBorderBottom : '')}
                            >
                              <IconButton
                                aria-label="Delete"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  this.setState({ removingProduct: adminProduct.product });
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                          {showSimilarProducts &&
                            <TableRow>
                              <TableCell colSpan={showOnlyInvalidProducts ? 11 : 10}>
                                <div
                                  className={csn(
                                    classes.similarProductsContainer,
                                    adminProduct.similarProducts.length === 0
                                      ? classes.emptySimilarProductsContainer
                                      : '',
                                  )}
                                >
                                  <div className={classes.similarProductsRoot}>
                                    {adminProduct.similarProducts.map(this.renderSimilarProduct)}
                                    {adminProduct.similarProducts.length === 0 &&
                                      <Typography className={classes.noSimilarProducts}>
                                        No similar products
                                      </Typography>
                                    }
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          }
                        </React.Fragment>
                      );
                    })}
                  </TableBody>
                  <TableFooter className={classes.footer}>
                    <TableRow>
                      <TablePagination
                        colSpan={3}
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={(event, newPage) => this.setState({ page: newPage })}
                        onChangeRowsPerPage={({ target: { value } }) =>
                          this.setState({ rowsPerPage: parseInt(value, 10) })}
                        rowsPerPageOptions={[25, 50, 100, 1000]}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </Paper>
          </div>
        </div>
        <GcRemoveProduct
          open={!!removingProduct}
          name={(removingProduct && removingProduct.name) || ''}
          onClose={() => this.setState({ removingProduct: undefined })}
          onDelete={() => removingProduct && removeProduct(removingProduct)}
        />
      </>
    );
  }

  private renderValue = (column: ColumnId, adminProduct: AdminProduct) => {
    if (column === 'keyWords' && adminProduct.product.keyWords) {
      return '[' + adminProduct.product.keyWords.join(', ') + ']';
    } else if (column === 'problem' && adminProduct.problems) {
      return adminProduct.problems.join(', ');
    }
    return adminProduct.product[column];
  }

  private renderSimilarProduct = (product: Product) => {
    return (
      <GcSimilarProduct
        key={product.id}
        product={product}
        onClick={this.handleEditProduct(product)}
      />
    );
  }

  private getProductProblems = () => {
    return this.getProductProblemMem(this.props.products);
  }

  private getProducts = (): ProductsInfo => {
    const { page, rowsPerPage, showOnlyInvalidProducts, showSimilarProducts, filterByImage, filterByName,
      filterByCaloriesFrom, filterByCaloriesTo, filterByFatFrom, filterByFatTo, filterByCarbsFrom, filterByCarbsTo,
      filterByProteinFrom, filterByProteinTo, filterByKeywords, filterByComment, filterByDescription } = this.state;

    const products = showOnlyInvalidProducts || filterByImage || filterByName || filterByCaloriesFrom
      || filterByCaloriesTo || filterByFatFrom || filterByFatTo || filterByCarbsFrom || filterByCarbsTo
      || filterByProteinFrom || filterByProteinTo || filterByKeywords || filterByComment || filterByDescription
      ? this.filterProducts(this.props.products)
      : this.props.products;

    this.sortProducts(products);

    const productProblems = this.getProductProblems();

    const adminProducts: Array<AdminProduct> = [];
    products.slice(page * rowsPerPage, (page + 1) * rowsPerPage).forEach((product) => {
      adminProducts.push({
        product,
        similarProducts: showSimilarProducts ? productHelper.getSimilarProducts(product, this.props.products) : [],
        problems: productProblems[product.id],
      });
    });

    return {
      adminProducts,
      count: products.length,
    };
  }

  private exportProducts = async () => {
    const csv = await csvExportProducts(this.props.products);
    const file = new File([csv], 'products.csv', { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(file);
  }

  private importProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsText(event.target.files[0]);
      reader.onload = async () => this.props.importProducts(await csvImportProducts(String(reader.result || '')));
      if (this.importInput) {
        // clear input https://stackoverflow.com/questions/20549241/how-to-reset-input-type-file
        this.importInput.type = '';
        this.importInput.type = 'file';
      }
    }
  }

  // private mergeFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length === 2 && event.target.files[0]) {
  //     const file2 = event.target.files[1];
  //     const reader = new FileReader();
  //     reader.readAsText(event.target.files[0]);
  //     reader.onload = async () => {
  //       const target = await csvImportProducts(String(reader.result || '')) as Array<Product>;

  //       const reader2 = new FileReader();
  //       reader2.readAsText(file2);
  //       reader2.onload = async () => {
  //         const source = await csvImportProducts(String(reader2.result || '')) as Array<Product>;

  //         const b: Array<any> = [];
  //         const result = target.map((targetIter) => {
  //           const product = source.find((sourceIter) => Boolean(
  //             (sourceIter.name.trim().toLowerCase() === targetIter.name.trim().toLowerCase())));
  //           if (product) {
  //             if (
  //               ((product.protein === targetIter.protein) || (!product.protein && !targetIter.protein)) &&
  //               ((product.fat === targetIter.fat) || (!product.fat && !targetIter.fat)) &&
  //               ((product.carbs === targetIter.carbs) || (!product.carbs && !targetIter.carbs)) &&
  //               ((product.calories === targetIter.calories) || (!product.calories && !targetIter.calories)) &&
  //               (!targetIter.id || (targetIter.id === product.id))
  //             ) {
  //               return {
  //                 ...targetIter,
  //                 id: product.id,
  //                 protein: product.protein,
  //                 fat: product.fat,
  //                 carbs: product.carbs,
  //                 calories: product.calories,
  //                 duplicate: '',
  //               };
  //             } else {
  //               b.push(targetIter, product);
  //               return {
  //                 ...targetIter,
  //                 duplicate: 1,
  //               };
  //             }
  //           }
  //           return {
  //             ...targetIter,
  //             duplicate: '',
  //           };
  //         });
  //         console.log(result, b, file2);
  //         result.sort((l, r) => l.name.localeCompare(r.name));

  //         const csv = await csvExportProducts(result);
  //         console.log(JSON.stringify(result));
  //         const file = new File([csv], 'products-merged.csv', {type: 'text/plain;charset=utf-8'});
  //         FileSaver.saveAs(file);
  //       };

  //     };

  //     if (this.importInput) {
  //       // clear input https://stackoverflow.com/questions/20549241/how-to-reset-input-type-file
  //       this.importInput.type = '';
  //       this.importInput.type = 'file';
  //     }
  //   }
  // }

  private calcPopularProducts = async () => {
    try {
      await apiCall('GET', 'admin/calcPopular').toPromise();
      this.props.showPopupMessage({ text: 'Popular products recalculated' });
    } catch (e) {
      this.props.showPopupMessage({ text: e.message });
    }
  }

  private createProduct = () => this.props.onEditProduct(productHelper.createProduct());

  private handleEditProduct = (product: Product) => () => {
    this.props.onEditProduct(product);
  }

  private filterProducts = (products: Array<Product>): Array<Product> => {
    const { showOnlyInvalidProducts, filterByImage, filterByName, filterByCaloriesFrom, filterByCaloriesTo,
      filterByFatFrom, filterByFatTo, filterByCarbsFrom, filterByCarbsTo, filterByProteinFrom, filterByProteinTo,
      filterByKeywords, filterByProblem, filterByComment, filterByDescription } = this.state;

    const productProblems = this.getProductProblems();

    return products.filter((product) => {
      if (showOnlyInvalidProducts) {
        const problems = productProblems[product.id];

        if (!problems) {
          return false;
        }

        if (filterByProblem) {
          let filterValue = filterByProblem;
          const findProblemCallback = (iter: string) =>
            Boolean(iter && iter.toLowerCase().includes(filterValue.toLowerCase()));

          if (filterByProblem.startsWith('!=')) {
            filterValue = filterByProblem.substr(2);
            if (problems.find(findProblemCallback)) {
              return false;
            }
          } else {
            if (!problems.find(findProblemCallback)) {
              return false;
            }
          }
        }
      }

      if (filterByKeywords) {
        let filterValue = filterByKeywords;
        const findKeyWordCallback = (iter: string) =>
          Boolean(iter && iter.toLowerCase().includes(filterValue.toLowerCase()));

        if (filterByKeywords.startsWith('!=')) {
          filterValue = filterByKeywords.substr(2);

          if (product.keyWords && product.keyWords.find(findKeyWordCallback)) {
            return false;
          }
        } else {
          if (!product.keyWords) {
            return false;
          } else if (!product.keyWords.find(findKeyWordCallback)) {
            return false;
          }
        }
      }

      if (filterByImage && (!product.image || !product.image.toUpperCase().includes(filterByImage.toUpperCase()))) {
        return false;
      }

      if (filterByName && !product.name.toUpperCase().includes(filterByName.toUpperCase())) {
        return false;
      }

      if (filterByDescription && !product.description) {
        return false;
      }

      if (filterByComment && (!product.comment || (product.comment
        && !product.comment.toUpperCase().includes(filterByComment.toUpperCase())))
      ) {
        return false;
      }

      const caloriesFrom = parseFloat(filterByCaloriesFrom);
      if (!isNaN(caloriesFrom) && product.calories < caloriesFrom) {
        return false;
      }

      const caloriesTo = parseFloat(filterByCaloriesTo);
      if (!isNaN(caloriesTo) && (caloriesTo >= caloriesFrom || isNaN(caloriesFrom))
        && product.calories > caloriesTo) {

        return false;
      }

      const fatFrom = parseFloat(filterByFatFrom);
      if (!isNaN(fatFrom) && product.fat < fatFrom) {
        return false;
      }

      const fatTo = parseFloat(filterByFatTo);
      if (!isNaN(fatTo) && (fatTo >= fatFrom || isNaN(fatFrom)) && product.fat > fatTo) {
        return false;
      }

      const carbsFrom = parseFloat(filterByCarbsFrom);
      if (!isNaN(carbsFrom) && product.carbs < carbsFrom) {
        return false;
      }

      const carbsTo = parseFloat(filterByCarbsTo);
      if (!isNaN(carbsTo) && (carbsTo >= carbsFrom || isNaN(carbsFrom)) && product.carbs > carbsTo) {
        return false;
      }

      const proteinFrom = parseFloat(filterByProteinFrom);
      if (!isNaN(proteinFrom) && product.protein < proteinFrom) {
        return false;
      }

      const proteinTo = parseFloat(filterByProteinTo);
      if (!isNaN(proteinTo) && (proteinTo >= proteinFrom || isNaN(proteinFrom)) && product.protein > proteinTo) {
        return false;
      }

      return true;
    });
  }

  private sortProducts(products: Array<Product>) {
    const { orderBy, orderDirection } = this.state;

    if (orderBy === 'problem') {
      const productProblems = this.getProductProblems();
      products.sort((a, b) => {
        const aValue = (productProblems[a.id].length || 0);
        const bValue = (productProblems[b.id].length || 0);
        const result = orderDirection === 'desc' ? bValue - aValue : aValue - bValue;

        if (result === 0 && aValue > 0) {
          return orderDirection === 'desc'
            ? productProblems[b.id][0].localeCompare(productProblems[a.id][0])
            : productProblems[a.id][0].localeCompare(productProblems[b.id][0]);
        }
        return result;
      });
      return;
    }

    if (orderBy === 'keyWords') {
      products.sort(({ keyWords: a = [] }, { keyWords: b = [] }) => {
        return orderDirection === 'desc' ? b.length - a.length : a.length - b.length;
      });
      return;
    }

    if (orderBy === 'description') {
      products.sort((a, b) => {
        return orderDirection === 'desc'
          ? (b.description ? 1 : 0) - (a.description ? 1 : 0)
          : (a.description ? 1 : 0) - (b.description ? 1 : 0);
      });
      return;
    }

    products.sort((a, b) => {

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

  private handleFilterInvalidProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ showOnlyInvalidProducts: event.target.checked });
  }

  private handleSimilarProductsVisibility = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ showSimilarProducts: event.target.checked });
  }

  private handleFilterByImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterByImage: event.target.value });
  }

  private handleClearFilterByImageClick = () => this.setState({ filterByImage: '' });

  private handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterByName: event.target.value });
  }

  private handleClearFilterByNameClick = () => this.setState({ filterByName: '' });

  private handleFilterByDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterByDescription: event.target.checked });
  }

  private handleFilterByCaloriesFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterByCaloriesFrom: this.getNutrientValue(event.target.value) });
  }

  private handleClearFilterByCaloriesFromClick = () => this.setState({ filterByCaloriesFrom: '' });

  private handleFilterByCaloriesTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterByCaloriesTo: this.getNutrientValue(event.target.value) });
  }

  private handleClearFilterByCaloriesToClick = () => this.setState({ filterByCaloriesTo: '' });

  private handleFilterByFatFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterByFatFrom: this.getNutrientValue(event.target.value) });
  }

  private handleClearFilterByFatFromClick = () => this.setState({ filterByFatFrom: '' });

  private handleFilterByFatTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterByFatTo: this.getNutrientValue(event.target.value) });
  }

  private handleClearFilterByFatToClick = () => this.setState({ filterByFatTo: '' });

  private handleFilterByCarbsFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterByCarbsFrom: this.getNutrientValue(event.target.value) });
  }

  private handleClearFilterByCarbsFromClick = () => this.setState({ filterByCarbsFrom: '' });

  private handleFilterByCarbsTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterByCarbsTo: this.getNutrientValue(event.target.value) });
  }

  private handleClearFilterByCarbsToClick = () => this.setState({ filterByCarbsTo: '' });

  private handleFilterByProteinFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterByProteinFrom: this.getNutrientValue(event.target.value) });
  }

  private handleClearFilterByProteinFromClick = () => this.setState({ filterByProteinFrom: '' });

  private handleFilterByProteinTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterByProteinTo: this.getNutrientValue(event.target.value) });
  }

  private handleClearFilterByProteinToClick = () => this.setState({ filterByProteinTo: '' });

  private handleFilterByKeywords = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterByKeywords: event.target.value });
  }

  private handleClearFilterByKeywordsClick = () => this.setState({ filterByKeywords: '' });

  private handleFilterByProblem = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterByProblem: event.target.value });
  }

  private handleClearFilterByProblemClick = () => this.setState({ filterByProblem: '' });

  private handleFilterByComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterByComment: event.target.value });
  }

  private handleClearFilterByCommentClick = () => this.setState({ filterByComment: '' });

  private getNutrientValue = (value: string): string => {
    if (value.length === 1
      || (value.charAt(value.length - 1) !== '.' && value.charAt(value.length - 1) !== '0')
      || (value.charAt(value.length - 1) === '.' && value.indexOf('.') !== value.length - 1)) {

      const floatValue = parseFloat(value);
      value = isNaN(floatValue) ? '' : floatValue.toString();
    }

    return value;
  }

}

export const GcAdminProductsViewStyled =
  withStyles(gcAdminProductsStylesCallback)(GcAdminProductsView);
