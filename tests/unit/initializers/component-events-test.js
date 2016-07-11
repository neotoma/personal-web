import Ember from 'ember';
import ComponentEventsInitializer from 'web/initializers/component-events';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | component events', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  ComponentEventsInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
