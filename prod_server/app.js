var express = require('express');
var path = require('path');
var app = express();
var server = app.listen(process.env.WEB_PORT);

app.use(require('prerender-node'));
app.use('/assets', express.static(__dirname + '/app/assets'));
app.use('/bower_components', express.static(__dirname + '/app/bower_components'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

module.exports = app;

console.log('App server started in "%s" env on port %s', app.get('env'), process.env.WEB_PORT);