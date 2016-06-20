import Ember from 'ember';
import ScrollToUpdateAppNavMixin from '../mixins/scroll-to-update-app-nav';

export default Ember.Component.extend(ScrollToUpdateAppNavMixin, {
  appNavOption: 'Writing',
  store: Ember.inject.service(),

  init() {
    this._super(...arguments);
    var self = this;

    this.get('store').findAll('post').then(function(posts) {
      self.set('featuredPost', posts.shiftObject());
      self.set('featuredPosts', posts.slice(0,6));
      self.set('morePosts', posts.slice(6,30));
    });
  }
});
