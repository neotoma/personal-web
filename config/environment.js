require('../lib/env');

/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'web',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {}
    },
    intl: {
      baseLocale: 'en-us'
    },
    APP: {}
  };

  ENV.EmberENV.API_HOST = process.env.PERSONAL_WEB_API_HOST;
  ENV.EmberENV.GA_TRACKING_ID = process.env.PERSONAL_WEB_GA_TRACKING_ID;

  if (environment === 'test') {
    ENV.baseURL = '/';
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
  }

  return ENV;
};
