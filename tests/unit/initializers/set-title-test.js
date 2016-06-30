import Ember from 'ember';
import SetTitleInitializer from 'web/initializers/set-title';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | set title', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  SetTitleInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
