import EmberObject from '@ember/object';
import ListingMixin from 'personal-web/mixins/listing';
import { module, test } from 'qunit';

module('Unit | Mixin | listing');

// Replace this with your real tests.
test('it works', function(assert) {
  let ListingObject = EmberObject.extend(ListingMixin);
  let subject = ListingObject.create();
  assert.ok(subject);
});
