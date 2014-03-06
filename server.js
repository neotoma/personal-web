var express = require('express');
var path = require('path');

var app = express();
var server = app.listen(80);

staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));

app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);

app.get('*', function(request, response) {
  response.render('index.html');
});