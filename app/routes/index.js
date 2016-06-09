import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      links: this.store.findAll('link'),
      posts: this.store.findAll('post')
    });
  },

  setupController(controller, model) {
    controller.set('links', model.links);
    controller.set('featuredPost', model.posts.shiftObject());
    controller.set('featuredPosts', model.posts.slice(0,6));
    controller.set('morePosts', model.posts.slice(6,30));
  }
});