import Ember from 'ember';
import ScrollingMixin from 'web/mixins/scrolling';
import { module, test } from 'qunit';

module('Unit | Mixin | scrolling');

// Replace this with your real tests.
test('it works', function(assert) {
  let ScrollingObject = Ember.Object.extend(ScrollingMixin);
  let subject = ScrollingObject.create();
  assert.ok(subject);
});
