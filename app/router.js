import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('post', { path: '/post/:post_id' });
  this.route('photos');
});

Ember.Route.reopen({
  appNav: Ember.inject.service(),
  activate: function() {
    this._super();
    this.get('appNav').set('options', this.get('appNavOptions'));
    //window.scrollTo(0,0);
  }
});

export default Router;
