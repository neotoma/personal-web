import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  setupController: function(controller, error) {
    if (error) {
      Ember.Logger.debug(error.message);
      controller.set('error', error);
    }

    this.set('headData.title', 'Error');
  }
});
