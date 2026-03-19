const proxy = require('http-proxy-middleware');
const express = require('express');
const path = require('path');

module.exports = function(app) {
  app.use(proxy('/api', { 
    target: 'http://localhost:3001/',
  }));

  app.use(proxy('/ssr', { 
    target: 'http://localhost:3001',
  }));

  app.use(proxy('/img', {
      target: 'http://localhost:3003',
      pathRewrite: function (urlPath) { 
        const imageInfo = JSON.parse(new Buffer(urlPath.split('/').pop(), 'base64').toString());
        return path.join('/graycat-media-bucket-dev', imageInfo.key);
      }
  }));

  app.use(proxy('/share', {
    target: 'http://localhost:3003',
    pathRewrite: {
      '^/share': '/graycat-user-content-dev/share'
    }
  }));

  app.use('/assets', express.static('../server/build/'));
};