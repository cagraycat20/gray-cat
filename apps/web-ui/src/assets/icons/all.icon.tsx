import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

export const AllIcon: React.SFC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <g fill="currentColor">
      <rect x="5" y="4" width="6" height="4" />
      <rect x="13" y="4" width="6" height="4" />
      <rect x="5" y="10" width="6" height="4" />
      <rect x="13" y="10" width="6" height="4" />
      <rect x="5" y="16" width="6" height="4" />
      <rect x="13" y="16" width="6" height="4" />
    </g>
  </SvgIcon>
);
