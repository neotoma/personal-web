import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('photo');
  },
  
  setupController(controller, model) {
    controller.set('photos', model);
  }
});
