import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { csn } from '../../../../web-ui/src/shared';
import { ClassKey, stylesCallback } from './gc-pagination.style';

const maxPageNumberToShowInRow = 7; // Max amount of numbers that can be arranged in a row on small devices

interface GcPaginationProps {
  pageNum: number;
  pageCount: number;
  getUrl: (pageNumber: number) => string;
  classes: Record<ClassKey, string>;
}

export const GcPaginationView: React.SFC<GcPaginationProps> = (
  {pageNum, pageCount, getUrl, classes},
) => {

  const Dots: React.SFC<{}> = () => <Typography>...</Typography>;

  const Page: React.SFC<{num: number, selected?: boolean}> = ({num, selected}) => (
    <Button
      href={getUrl(num)}
      disabled={selected}
      className={csn(classes.pageNumber, {[classes.pageNumberSelected] : selected})}
    >
      <Typography>{num}</Typography>
    </Button>
  );

  if (pageCount <= maxPageNumberToShowInRow) {
    return (
      <>
        {Array(pageCount).fill(null).map((value, index) => {
          const num = index + 1;
          return <Page key={num} num={num} selected={pageNum === num}/>;
        })}
      </>
    );
  }

  const middlePageNum = Math.ceil(pageCount / 2);

  return (
    <>
      <Page num={1} selected={pageNum === 1}/>
      {pageNum === 1 && <Page num={pageNum + 1}/>}
      {pageNum === 2 &&
        <>
          <Page num={pageNum} selected={true}/>
          <Page num={pageNum + 1}/>
          <Dots/>
        </>
      }
      {pageNum === 3 &&
        <>
          <Page num={pageNum - 1}/>
          <Page num={pageNum} selected={true}/>
          <Page num={pageNum + 1}/>
          <Dots/>
        </>
      }
      {pageNum > 3 && pageNum < pageCount - 2 &&
        <>
          <Dots/>
          <Page num={pageNum - 1}/>
          <Page num={pageNum} selected={true}/>
          <Page num={pageNum + 1}/>
          <Dots/>
        </>
      }
      {(pageNum === 1 || pageNum === pageCount) &&
        <>
          <Dots/>
          <Page num={middlePageNum - 1}/>
          <Page num={middlePageNum}/>
          <Page num={middlePageNum + 1}/>
          <Dots/>
        </>
      }
      {pageNum === pageCount - 2 &&
        <>
          <Dots/>
          <Page num={pageNum - 1}/>
          <Page num={pageNum} selected={true}/>
          <Page num={pageNum + 1}/>
        </>
      }
      {pageNum === pageCount - 1 &&
        <>
          <Dots/>
          <Page num={pageNum - 1}/>
          <Page num={pageNum} selected={true}/>
        </>
      }
      {pageNum === pageCount && <Page num={pageNum - 1}/>}
      <Page num={pageCount} selected={pageNum === pageCount}/>
    </>
  );
};

export const GcPagination =
  withStyles(stylesCallback, {withTheme: true})(GcPaginationView);
