import Ember from 'ember';
import ComponentEventsMixin from 'personal-web/mixins/component-events';
import { module, test } from 'qunit';

module('Unit | Mixin | component events');

// Replace this with your real tests.
test('it works', function(assert) {
  let ComponentEventsObject = Ember.Object.extend(ComponentEventsMixin);
  let subject = ComponentEventsObject.create();
  assert.ok(subject);
});
