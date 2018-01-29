
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('background-image-style', 'helper:background-image-style', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{background-image-style inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

