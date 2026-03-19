import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

interface Props {
  hours: number;
  minutes: number;
}

export const LiveTimeIcon: React.SFC<SvgIconProps & Props> = ({hours, minutes, ...other}) => (
  <SvgIcon {...other}>
    <g transform="translate(12 12)" stroke="currentColor" fill="currentColor" strokeWidth="1.5px">
      <circle r="9" strokeWidth="2" fillOpacity="0" />
      <line transform={`rotate(${360 / 12 * hours})`} x1="0" y1="0.5" x2="0" y2="-4" />
      <line transform={`rotate(${360 / 60 * minutes})`} x1="0" y1="0.5" x2="0" y2="-6" />
    </g>
  </SvgIcon>
);
