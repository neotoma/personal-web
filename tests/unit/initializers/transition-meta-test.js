import Ember from 'ember';
import TransitionMetaInitializer from 'web/initializers/transition-meta';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | transition meta', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  TransitionMetaInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
