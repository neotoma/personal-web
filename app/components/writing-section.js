import Ember from 'ember';
import ScrollToUpdateAppNavMixin from '../mixins/scroll-to-update-app-nav';

export default Ember.Component.extend(ScrollToUpdateAppNavMixin, {
  appNavOption: 'Writing',
  tagName: 'section',
  classNames: ['writing'],
  classNameBindings: ['shown'],
  attributeBindings: ['id'],
  id: 'writing',
  store: Ember.inject.service(),

  init() {
    this._super(...arguments);
    var self = this;

    this.get('store').findAll('post').then(function(posts) {
      self.set('featuredPost', posts.objectAt(0));
      self.set('featuredPosts', posts.slice(1,6));
      self.set('morePosts', posts.slice(6,30));
      self.set('shown', true);
    });
  }
});
