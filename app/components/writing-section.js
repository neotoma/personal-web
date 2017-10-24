import Ember from 'ember';
import ScrollToUpdateAppNavMixin from 'personal-web/mixins/scroll-to-update-app-nav';
import ComponentTransitionsMixin from 'personal-web/mixins/component-transitions';

export default Ember.Component.extend(ScrollToUpdateAppNavMixin, ComponentTransitionsMixin, {
  appNavOption: 'Writing',
  attributeBindings: ['id'],
  classNames: ['writing'],
  id: 'writing',
  posts: [],
  sortedPostsProperties: ['publishedAt:desc'],
  sortedPosts: Ember.computed.sort('posts', 'sortedPostsProperties'),
  store: Ember.inject.service(),
  tagName: 'section',

  init() {
    this._super(...arguments);

    var query = this.get('store').findAll('post').then((posts) => {
      this.set('posts', posts);
      this.set('loaded', true);
    }).catch((error) => {
      this.handleError(error);
    });

    this.deferRendering(query);
  },

  featuredPost: Ember.computed('sortedPosts.length', function() {
    if (this.get('sortedPosts.length')) {
      return this.get('sortedPosts').objectAt(0);
    }
  }),

  featuredPosts: Ember.computed('sortedPosts.length', function() {
    if (this.get('sortedPosts.length')) {
      return this.get('sortedPosts').slice(1,6);
    }
  }),

  morePosts: Ember.computed('sortedPosts.length', function() {
    if (this.get('sortedPosts.length')) {
      return this.get('sortedPosts').slice(6,30);
    }
  }),

  empty: Ember.computed('posts.length', function() {
    return !(this.get('posts.length'));
  })
});
