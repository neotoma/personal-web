import computedAttribute from 'personal-web/utils/computed-attribute';
import Ember from 'ember';

export default Ember.Mixin.create({
  store: Ember.inject.service(),

  init() {
    this._super(...arguments);

    if (!this.get('computedAttributes')) { return; }

    var query = this.get('store').findAll('attribute').then((attributes) => {
      this.set('attributes', attributes);
    });

    this.get('computedAttributes').forEach((attributeName) => {
      this.set(attributeName, computedAttribute(attributeName));
    });

    this.deferRendering(query);
  }
});
