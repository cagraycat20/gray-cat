import * as React from 'react';

export interface OwnProps extends React.Attributes {
  title: string;
  // tslint:disable-next-line: no-any
  children: React.ReactElement<any>;
}

export type Props = OwnProps;
