var http = require('http'),
  express = require('express'),
  path = require('path'),
  app = express(),
  ip = process.env.HOSTNAME || 'localhost',
  port = process.env.PORT || 8080,
  publicFolderPath;

publicFolderPath = path.resolve(__dirname, '../public');
console.log('Serving static content from:', publicFolderPath);

/**
 * Bypass the express router for static assets
 */

app.use(express.static(publicFolderPath, {
  dotfiles: 'ignore',
  index: false
}));

/**
 * Always serve the same HTML file for all requests
 */

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(publicFolderPath, 'index.html'));
});

/**
 * Error Handling
 */

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.sendStatus(err.status || 500);
});


/**
 * Start Server
 */

http.createServer(app).listen(port, function () {
  console.log('Now hosting at http://' + ip + ':' + port);
});