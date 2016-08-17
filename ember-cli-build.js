/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles = require('broccoli-static-compiler');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    modernizr: {
      shouldParseFiles: false
    },
    postcssOptions: {
      compile: {
        enabled: false
      },
      filter: {
        enabled: true,
        plugins: [{
          module: require('mq4-hover-shim').postprocessorFor,
          options: {
            hoverSelectorPrefix: 'html.hover '
          }
        }]
      }
    },
    fingerprint: {
      exclude: ['analytics.js', 'analytics.min.js']
    }
  });

  app.import('bower_components/ember/ember-template-compiler.js');

  // PhotoSwipe
  app.import('bower_components/photoswipe/dist/photoswipe.css');
  app.import('bower_components/photoswipe/dist/photoswipe.js');
  app.import('bower_components/photoswipe/dist/photoswipe-ui-default.js');

  var photoswipeImages = pickFiles('bower_components/photoswipe/dist/default-skin', {
    srcDir: '/',
    files: ['**/*.png', '**/*.gif'],
    destDir: '/assets'
  });

  return app.toTree([photoswipeImages]);
};