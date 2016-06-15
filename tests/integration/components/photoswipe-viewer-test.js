import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('photoswipe-viewer', 'Integration | Component | photoswipe viewer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{photoswipe-viewer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#photoswipe-viewer}}
      template block text
    {{/photoswipe-viewer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
