const fs = require('fs');
fs.writeFileSync('./node_modules/webpack-dev-server/ssl/server.pem', fs.readFileSync('./cert/server.pem'));