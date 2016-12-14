require('./lib/env');

var express = require('express');
var path = require('path');
var app = express();

if (!process.env.PERSONAL_WEB_PORT) {
  throw new Error('App failed to find port from environment');
}

var port =process.env.PERSONAL_WEB_PORT;
var server = app.listen(port);

app.use(require('prerender-node'));
app.use('/assets', express.static(__dirname + '/dist/assets'));
app.use('/bower_components', express.static(__dirname + '/dist/bower_components'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

module.exports = app;

console.log('App started on port %s', port);