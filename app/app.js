import config from 'personal-web/config/environment';
import Ember from 'ember';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'personal-web/resolver';

let App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
