import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';

import { csn } from '../../../../web-ui/src/shared';
import { StyleProps, stylesCallback } from './gc-discus.style';

export interface OwnProps {
  className?: string;
  id: string;
}

const { STAGE = '' } = process.env;

const GcDiscusView: React.SFC<OwnProps & StyleProps> = ({ id, className, classes }) => {
  const script = `
    var disqus_config = function () {
      this.page.identifier = '${STAGE}-${id}';
    };
    (function() {
      var d = document, s = d.createElement('script');
      s.src = 'https://${STAGE.toLowerCase() === 'prod' ? 'protomeal' : 'uat-protomeal-com'}.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  `;

  return (
    <>
      <div id="disqus_thread" className={csn(classes.root, className)} />
      <script dangerouslySetInnerHTML={{__html: script}} />
    </>
  );
};

export const GcDiscus =
  withStyles(stylesCallback, { withTheme: true })(GcDiscusView);
