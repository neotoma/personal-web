import config from 'personal-web/config/environment';
import Ember from 'ember';
import RouterScroll from 'ember-router-scroll';

const Router = Ember.Router.extend(RouterScroll, {
  location: config.locationType
});

Router.map(function() {
  this.route('affiliations');
  this.route('application-error');
  this.route('book', { path: '/books/:book_id' });
  this.route('books');
  this.route('category', { path: '/categories/:category_id' });
  this.route('checkins');
  this.route('companies');
  this.route('links');
  this.route('messages');
  this.route('not-found', { path: '*path'});
  this.route('photo', { path: '/photos/:photo_id' });
  this.route('photo-album', { path: '/photo-albums/:photo_album_id' });
  this.route('photos');
  this.route('post', { path: '/posts/:post_id' });
  this.route('posts');
  this.route('publications');
  this.route('skills');
});

Ember.Route.reopen({
  appNav: Ember.inject.service(),

  activate: function() {
    this._super();
    this.get('appNav').set('hidden', this.get('appNavHidden'));
  }
});

export default Router;
