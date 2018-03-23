import EmberObject from '@ember/object';
import QueryManagerMixin from 'personal-web/mixins/query-manager';
import { module, test } from 'qunit';

module('Unit | Mixin | query manager');

// Replace this with your real tests.
test('it works', function(assert) {
  let QueryManagerObject = EmberObject.extend(QueryManagerMixin);
  let subject = QueryManagerObject.create();
  assert.ok(subject);
});
