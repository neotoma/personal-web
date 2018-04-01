import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('confirm-message-section', 'Integration | Component | confirm message section', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{confirm-message-section}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#confirm-message-section}}
      template block text
    {{/confirm-message-section}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
