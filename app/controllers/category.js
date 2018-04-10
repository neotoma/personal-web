import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  postsProperties: ['publishedAt:desc'],
  posts: Ember.computed.sort('category.posts', 'postsProperties'),
});
