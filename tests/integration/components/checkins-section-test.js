import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('checkins-section', 'Integration | Component | checkins section', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{checkins-section}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#checkins-section}}
      template block text
    {{/checkins-section}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
