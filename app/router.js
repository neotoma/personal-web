import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('post', { path: '/post/:post_id' });
  this.route('photos');
  this.route('not-found', { path: '*path'});
  this.route('application-error');
  this.route('application-loading');
  this.route('post-loading');
});

Ember.Route.reopen({
  appNav: Ember.inject.service(),
  activate: function() {
    this._super();
    this.get('appNav').set('options', this.get('appNavOptions'));
  }
});

export default Router;
