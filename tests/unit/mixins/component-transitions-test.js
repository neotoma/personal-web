import Ember from 'ember';
import ComponentTransitionsMixin from 'personal-web/mixins/component-transitions';
import { module, test } from 'qunit';

module('Unit | Mixin | component transitions');

// Replace this with your real tests.
test('it works', function(assert) {
  let ComponentTransitionsObject = Ember.Object.extend(ComponentTransitionsMixin);
  let subject = ComponentTransitionsObject.create();
  assert.ok(subject);
});
