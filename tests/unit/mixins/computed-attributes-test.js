import Ember from 'ember';
import ComputedAttributesMixin from 'personal-web/mixins/computed-attributes';
import { module, test } from 'qunit';

module('Unit | Mixin | computed attributes');

// Replace this with your real tests.
test('it works', function(assert) {
  let ComputedAttributesObject = Ember.Object.extend(ComputedAttributesMixin);
  let subject = ComputedAttributesObject.create();
  assert.ok(subject);
});
