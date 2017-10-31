import Route from '@ember/routing/route';

export default Route.extend({
  headData: Ember.inject.service(),

  model() {
    return this.store.findAll('checkin');
  },

  setupController(controller, model) {
    controller.set('checkins', model);
    this.set('headData.title', 'Check-ins');
  }
});
