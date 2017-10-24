import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('plan', params.plan_id);
  },

  setupController(controller, plan) {
    controller.set('plan', plan);
  }
});
