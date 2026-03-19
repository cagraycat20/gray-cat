// tslint:disable:max-line-length
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

interface Props {
  value: string;
}

export const LiveCalendarIcon: React.SFC<SvgIconProps & Props> = ({value, ...other}) => (
  <SvgIcon {...other}>
    <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
    <path fill="none" d="M0 0h24v24H0z"/>
    <text fontSize="6.5" x="50%" y="62%" dominantBaseline="middle" textAnchor="middle">{value}</text>
  </SvgIcon>
);
