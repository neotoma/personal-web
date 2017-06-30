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

    APP: {},

    intl: {
      baseLocale: 'en-us'
    }
  };

  if (environment === 'development') {
    ENV.EmberENV.API_HOST = process.env.WEB_DEV_API_HOST;
    ENV.EmberENV.GA_TRACKING_ID = process.env.WEB_DEV_GA_TRACKING_ID;
  }

  if (environment === 'test') {
    ENV.baseURL = '/';
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.EmberENV.API_HOST = process.env.WEB_PROD_API_HOST;
    ENV.EmberENV.GA_TRACKING_ID = process.env.WEB_PROD_GA_TRACKING_ID;
  }

  return ENV;
};
