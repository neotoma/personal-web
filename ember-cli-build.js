/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles = require('broccoli-static-compiler');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
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
    }
  });

  app.import('vendor/ember/ember-template-compiler.js');

  return app.toTree([]);
};
