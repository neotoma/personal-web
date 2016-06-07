import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('post').then(
      (posts) => posts,
      (error) => console.error(error)
    );
  },

  setupController(controller, model) {
    controller.set('featuredPost', model.shiftObject());
    controller.set('featuredPosts', model.slice(0,6));
    controller.set('morePosts', model.slice(6,30));
  }
});