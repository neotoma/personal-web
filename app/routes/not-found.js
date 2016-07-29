import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    Ember.run.next(function() {
      controller.set('loadedClass', 'loaded');
    });
  }
});