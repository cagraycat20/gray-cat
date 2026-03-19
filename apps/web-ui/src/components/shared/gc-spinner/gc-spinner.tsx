import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export const GcSpinner = ({className, style = {}}: Props) => (
  <div
    className={className}
    style={{
      position: 'absolute',
      backgroundColor: '#ffffffd0',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 1,
      transition: `opacity 1s ease-in-out`,
      ...style,
    }}
  >
    <CircularProgress />
  </div>
);
