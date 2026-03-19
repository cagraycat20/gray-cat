import {
  StyleRules,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import { ExtTheme, WithStylesAndTheme } from '../../shared/theme';

type ClassKey =
  | 'root'
  | 'nutrientContainer'
  | 'nutrientName'
  | 'nutrientValueContainerBase'
  | 'nutrientValueContainerCentered'
  | 'nutrientValueContainer1'
  | 'nutrientValueContainer2'
  | 'nutrientValueBase'
  | 'nutrientSuffix'
  | 'nutrientSuffixBigLineHeight'
  ;

export type StyleProps = WithStylesAndTheme<ClassKey>;

const valueMargin = 4;

export const stylesCallback:
  StyleRulesCallback<ClassKey> = (theme: ExtTheme) => {
    const { gridLine, card, breakpoints, colors } = theme.custom;
    const styles: StyleRules<ClassKey> = {
      root: {
        display: 'flex',
        minWidth: (card.small.width + gridLine) * 2 + 'px',
        [theme.breakpoints.up(breakpoints.col4)]: {
          minWidth: (card.normal.width + gridLine) * 2 + 'px',
        },
      },
      nutrientContainer: {
        borderRadius: '2px',
        position: 'relative',
        cursor: 'pointer',
        marginRight: gridLine + 'px',
        flex: 1,
        [theme.breakpoints.down(breakpoints.col4)]: {
          height: '30px !important',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          height: '40px !important',
        },
      },
      nutrientName: {
        top: '0',
        left: '0',
        right: '0',
        color: '#ffffff',
        position: 'absolute',
        fontWeight: 100,
        padding: '1px 0 1px',
        backgroundColor: colors.nutrientNameRowBackground,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down(breakpoints.col4)]: {
          fontSize: '11px',
          lineHeight: '11px',
          height: '14px',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          fontSize: '14px',
          lineHeight: '15px',
          height: '20px',
        },
      },
      nutrientValueContainerBase: {
        position: 'absolute',
        height: '50%',
        display: 'flex',
      },
      nutrientValueContainer1: {
        left: valueMargin + 'px',
        bottom: 0,
        width: 'calc(50% - 1px)',
        borderRight: '1px solid #ffffff32',
      },
      nutrientValueContainer2: {
        right: valueMargin + 'px',
        bottom: 0,
        fontSize: '12px',
        fontWeight: 200,
      },
      nutrientValueContainerCentered: {
        right: valueMargin + 'px',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 'normal !important',
        paddingBottom: '0',
        width: 'unset !important',
        borderRight: 'none !important',
      },
      nutrientValueBase: {
        color: '#fff',
      },
      nutrientSuffix: {
        color: '#ffffffd6',
        fontWeight: 100,
        fontSize: '10px',
        marginLeft: '2px',
        alignSelf: 'flex-end',
        [theme.breakpoints.down(breakpoints.col4)]: {
          lineHeight: '1.2',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          lineHeight: '1.4',
        },
      },
      nutrientSuffixBigLineHeight: {
        [theme.breakpoints.down(breakpoints.col4)]: {
          lineHeight: '1.4',
        },
        [theme.breakpoints.up(breakpoints.col4)]: {
          lineHeight: '1.6',
        },
      },
    };
    return styles;
  };
