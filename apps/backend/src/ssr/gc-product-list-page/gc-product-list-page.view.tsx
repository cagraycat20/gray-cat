import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import Helmet from 'react-helmet';
import {
  csn,
  globalClasses,
  nutrientClasses,
  productUtils as pu,
  toSeoUrl,
} from '../../../../web-ui/src/shared';
import { pagePath as pp } from '../../constants';
import {
  Product,
  ProductListPageData,
} from '../../types';
import { GcPagination } from '../gc-pagination/gc-pagination.view';
import { GcProductImage } from '../gc-product-image/gc-product-image';
import { GcPage } from '../shared/gc-page/gc-page.view';
// @ts-ignore
import productListPageScript from './gc-product-list-page.script';
import {
  imageSize,
  StyleProps,
  stylesCallback,
} from './gc-product-list-page.style';

export interface GcProductListPageProps {
  productListData: ProductListPageData;
}

function renderSearchRow(classes: StyleProps['classes'], searchString: string) {
  return (
    <div className={classes.searchContainer}>
      <TextField
        placeholder="Product search"
        variant="outlined"
        type="search"
        value={searchString}
        InputProps={{
          classes: {
            input: classes.searchInput,
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary"/>
            </InputAdornment>
          ),
        }}
        className={classes.searchField}
        id="search-input"
      />
      <Button
        variant="contained"
        id="search-button"
        color="primary"
        type="submit"
      >
        Search
      </Button>
    </div>
  );
}

function renderProducts(
  classes: StyleProps['classes'],
  products: Array<Product>,
) {
  return products.map((product) => {

    return (
      <a
        key={product.id}
        href={`${pp.productList}/${toSeoUrl(product.name)}`}
        className={classes.productLink}
      >
        <div className={classes.productRoot}>
          <GcProductImage
            className={classes.productImageContainer}
            classes={{img: classes.productImage}}
            height={imageSize.mobile.height}
            width={imageSize.normal.width}
            image={product.image}
            thumbnail={product.thumb || pu.defImageThumbnail}
            hideImageIfEmpty={true}
          />

          <Typography className={classes.productName}>
            {product.name}
          </Typography>

          <div className={classes.nutrientsContainer}>
            {
              pu.nutrientProps.map((nutrientIter) => {
                return (
                  <div
                    key={nutrientIter}
                    className={csn(nutrientClasses[nutrientIter], classes.nutrient)}
                  >
                    <Typography
                      className={classes.nutrientCaption}
                      align="center"
                    >
                      {pu.nutrientCaptionsShort[nutrientIter]}
                    </Typography>

                    <div className={classes.nutrientValueContainer}>
                      <Typography
                        className={csn(globalClasses.gcWhiteText, classes.nutrientValue)}
                      >
                        {product[nutrientIter]}
                      </Typography>
                      <Typography className={classes.nutrientValueSuffix}>
                        {nutrientIter === 'calories' ? 'kcal' : 'g'}
                      </Typography>
                    </div>

                  </div>
                );
              })
            }
          </div>

        </div>
        <Divider className={classes.divider} />
      </a>
    );
  });
}

function renderContent({classes, productListData}: GcProductListPageProps & StyleProps) {
  const { products, pageNum, pageCount, searchString } = productListData;
  return (
    <>
      <Helmet>
        <script src={productListPageScript} type="text/javascript" />
      </Helmet>
      <div className={classes.root}>
        <Typography
          className={classes.title}
          variant="h4"
          align="center"
        >
          List of products
        </Typography>
        {renderSearchRow(classes, searchString)}
        {renderProducts(classes, products)}
        <div className={classes.paginationContainer}>
          <GcPagination
            pageNum={pageNum}
            pageCount={pageCount}
            getUrl={(page) => `?page=${page}${searchString ? '&search=' + searchString : ''}`}
          />
        </div>
      </div>
    </>
  );
}

const GcProductListPageView: React.SFC<GcProductListPageProps & StyleProps> = (props) => {
  return (
    <GcPage
      title="Food Database | ProtoMeal"
      discusId={'product-list'}
      content={renderContent(props)}
    />
 );
};

export const GcProductListPage =
  withStyles(stylesCallback, {withTheme: true})(GcProductListPageView);
