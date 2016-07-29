import Ember from 'ember';
import ScrollToUpdateAppNavMixin from '../mixins/scroll-to-update-app-nav';
import ComponentTransitionsMixin from '../mixins/component-transitions';

export default Ember.Component.extend(ScrollToUpdateAppNavMixin, ComponentTransitionsMixin, {
  appNavOption: 'Writing',
  tagName: 'section',
  classNames: ['writing'],
  attributeBindings: ['id'],
  id: 'writing',
  store: Ember.inject.service(),
  sortedPostsProperties: ['publishedAt:desc'],
  sortedPosts: Ember.computed.sort('posts', 'sortedPostsProperties'),

  init() {
    this._super(...arguments);
    var self = this;

    this.get('store').findAll('post').then(function(posts) {
      self.set('posts', posts);
      
      Ember.run.next(function() {
        self.set('loaded', true);
      });
    });
  },

  featuredPost: function() {
    if (this.get('sortedPosts.length')) {
      return this.get('sortedPosts').objectAt(0);
    }
  }.property('sortedPosts.length'),

  featuredPosts: function() {
    if (this.get('sortedPosts.length')) {
      return this.get('sortedPosts').slice(1,6);
    }
  }.property('sortedPosts.length'),

  morePosts: function() {
    if (this.get('sortedPosts.length')) {
      return this.get('sortedPosts').slice(6,30);
    }
  }.property('sortedPosts.length')
});
