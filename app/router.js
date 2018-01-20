import config from 'personal-web/config/environment';
import Ember from 'ember';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('application-error');
  this.route('not-found', { path: '*path'});
  this.route('checkins');
  this.route('companies');
  this.route('post', { path: '/posts/:post_id' });
  this.route('posts');
  this.route('skills');
  this.route('links');
});

Ember.Route.reopen({
  appNav: Ember.inject.service(),

  activate: function() {
    this._super();
    this.get('appNav').set('hidden', this.get('appNavHidden'));
  }
});

export default Router;
