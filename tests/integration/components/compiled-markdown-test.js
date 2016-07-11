import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('compiled-markdown', 'Integration | Component | compiled markdown', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{compiled-markdown}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#compiled-markdown}}
      template block text
    {{/compiled-markdown}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
