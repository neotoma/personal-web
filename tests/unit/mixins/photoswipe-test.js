import Ember from 'ember';
import PhotoswipeMixin from 'web/mixins/photoswipe';
import { module, test } from 'qunit';

module('Unit | Mixin | photoswipe');

// Replace this with your real tests.
test('it works', function(assert) {
  let PhotoswipeObject = Ember.Object.extend(PhotoswipeMixin);
  let subject = PhotoswipeObject.create();
  assert.ok(subject);
});
