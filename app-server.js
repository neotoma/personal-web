console.log('Starting app server');

var express = require('express');
var path = require('path');
var app = express();

var port;
var renderOptions;

if (app.get('env') == 'development') {
  renderOptions = { 
    javascriptFiles: [
      'lib.js',
      'app.js',
      'templates.js'
    ]
  };
} else {
  renderOptions = { 
    javascriptFiles: [
      'app.js'
    ]
  };
}

if (app.get('env') == 'production') {
  port = 80;
}

var server = app.listen(port);

app.use(require('prerender-node'));
app.use('/static', express.static(__dirname + '/public'));

app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');

app.get('*', function(request, response) {
  response.render('index.ejs', renderOptions);
});

module.exports = app;

console.log('App server started in "%s" environment', app.get('env'));