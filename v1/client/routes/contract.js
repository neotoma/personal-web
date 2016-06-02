App.ContractRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.get('controllers.application').setTitle('Mark Hendrickson');
  }
});