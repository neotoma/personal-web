import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['id'],
  classNameBindings: ['limit:limited'],
  classNames: ['posts'],
  id: 'posts',
  sortedPostsProperties: ['publishedAt:desc'],
  sortedPosts: Ember.computed.sort('posts', 'sortedPostsProperties'),
  store: Ember.inject.service(),
  tagName: 'section',

  init() {
    this._super(...arguments);

    var query = this.get('store').findAll('post', {
      include: 'image',
      limit: this.get('limit'),
      sort: '-publishedAt'
    }).then((posts) => {
      this.set('posts', posts);
    }).catch((error) => {
      this.handleError(error);
    });

    this.deferRendering(query);
  }
});
