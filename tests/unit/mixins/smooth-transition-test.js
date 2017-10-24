import Ember from 'ember';
import SmoothTransitionMixin from 'personal-web/mixins/smooth-transition';
import { module, test } from 'qunit';

module('Unit | Mixin | smoooth transition');

// Replace this with your real tests.
test('it works', function(assert) {
  let SmoothTransitionObject = Ember.Object.extend(SmoothTransitionMixin);
  let subject = SmoothTransitionObject.create();
  assert.ok(subject);
});
