import * as React from 'react';

export type PropsOf<T, D = object> = T extends React.ComponentType<infer P> ? P : D;
