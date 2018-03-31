import Controller from '@ember/controller';

export default Controller.extend({
  postsProperties: ['publishedAt:desc'],
  posts: Ember.computed.sort('category.posts', 'postsProperties'),
});
