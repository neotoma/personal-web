import Ember from 'ember';
import ScrollToUpdateAppNavMixin from 'personal-web/mixins/scroll-to-update-app-nav';
import { module, test } from 'qunit';

module('Unit | Mixin | scroll to update app nav');

// Replace this with your real tests.
test('it works', function(assert) {
  let ScrollToUpdateAppNavObject = Ember.Object.extend(ScrollToUpdateAppNavMixin);
  let subject = ScrollToUpdateAppNavObject.create();
  assert.ok(subject);
});
