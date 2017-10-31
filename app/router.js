import config from 'personal-web/config/environment';
import Ember from 'ember';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('application-error');
  this.route('application-loading');
  this.route('not-found', { path: '*path'});
  this.route('photos');
  this.route('plan', { path: '/plans/:plan_id' });
  this.route('post', { path: '/post/:post_id' });
  this.route('post-loading');
  this.route('checkins');
});

Ember.Route.reopen({
  appNav: Ember.inject.service(),
  activate: function() {
    this._super();
    this.get('appNav').set('options', this.get('appNavOptions'));
  }
});

export default Router;
