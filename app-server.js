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

app.get('/11-reasons-why-i-wont-click-on-your-link-bait', function(req, res) {
  res.redirect(301, '/post/24');
});

app.get('/kanban', function(req, res) {
  res.redirect(301, '/post/23');
});

app.get('/success-projection-for-startups', function(req, res) {
  res.redirect(301, '/post/22');
});

app.get('/three-types-of-design', function(req, res) {
  res.redirect(301, '/post/21');
});

app.get('/the-postmvp-fork-in-the-road', function(req, res) {
  res.redirect(301, '/post/20');
});

app.get('/does-your-product-provide-instant-gratification', function(req, res) {
  res.redirect(301, '/post/19');
});

app.get('/a-postmortem-for-plancast', function(req, res) {
  res.redirect(301, '/post/18');
});

app.get('/share-frequency', function(req, res) {
  res.redirect(301, '/post/17');
});

app.get('/homesteading-on-the-indie-web', function(req, res) {
  res.redirect(301, '/post/16');
});

app.get('/content', function(req, res) {
  res.redirect(301, '/post/4');
});

app.get('/relationship', function(req, res) {
  res.redirect(301, '/post/5');
});

app.get('/three-pillars', function(req, res) {
  res.redirect(301, '/post/3');
});

app.get('/how-to-pitch-a-tech-blogger', function(req, res) {
  res.redirect(301, '/post/6');
});

app.get('/some-latenight-ideas-for-blippy', function(req, res) {
  res.redirect(301, '/post/15');
});

app.get('/plancast-in-public-beta', function(req, res) {
  res.redirect(301, '/post/14');
});

app.get('/facebooks-social-graph', function(req, res) {
  res.redirect(301, '/post/7');
});

app.get('/worldly-developments', function(req, res) {
  res.redirect(301, '/post/13');
});

app.get('/the-web-needs-its-own-app-store', function(req, res) {
  res.redirect(301, '/post/12');
});

app.get('/narrowing-scope', function(req, res) {
  res.redirect(301, '/post/11');
});

app.get('/the-unfolding-legacy-of-twitter-for-software-design', function(req, res) {
  res.redirect(301, '/post/10');
});

app.get('/my-first-week-as-an-entrepreneur', function(req, res) {
  res.redirect(301, '/post/8');
});

app.get('/getting-the-lay-of-the-land', function(req, res) {
  res.redirect(301, '/post/9');
});

app.get('*', function(req, res) {
  res.render('index.ejs', renderOptions);
});

module.exports = app;

console.log('App server started in "%s" environment', app.get('env'));