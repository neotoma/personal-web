import Ember from 'ember';
import Mq4HoverShimInitializer from 'web/initializers/mq4-hover-shim';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | mq4 hover shim', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  Mq4HoverShimInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
