var express = require('express');
var path = require('path');
var app = express();

var server = app.listen(process.env.WEB_PORT);

app.use(require('prerender-node'));
app.use('/assets', express.static(__dirname + '/dist/assets'));
app.use('/bower_components', express.static(__dirname + '/dist/bower_components'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

module.exports = app;

console.log('App server started in "%s" environment on port %s', app.get('env'), process.env.WEB_PORT);