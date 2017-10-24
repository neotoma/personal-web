import Ember from 'ember';
import FastbootDeferRenderingMixin from 'personal-web/mixins/fastboot-defer-rendering';
import { module, test } from 'qunit';

module('Unit | Mixin | fastboot defer rendering');

// Replace this with your real tests.
test('it works', function(assert) {
  let FastbootDeferRenderingObject = Ember.Object.extend(FastbootDeferRenderingMixin);
  let subject = FastbootDeferRenderingObject.create();
  assert.ok(subject);
});
