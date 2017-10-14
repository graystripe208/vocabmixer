var http = require('http'),
  express = require('express'),
  path = require('path'),
  app = express(),
  ip = process.env.HOSTNAME || 'localhost',
  port = process.env.PORT || 8080,
  publicFolderPath;

publicFolderPath = path.resolve(__dirname, 'client');
console.log('Serving static content from:', publicFolderPath);

app.use(express.static(publicFolderPath)); // For other requests, just serve /public

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(publicFolderPath, 'index.html'));
});

http.createServer(app).listen(port, function () {
  console.log('Now hosting at http://'+ ip + ':' + port);
});