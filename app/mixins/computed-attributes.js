import computedAttribute from 'personal-web/utils/computed-attribute';
import Ember from 'ember';

export default Ember.Mixin.create({
  store: Ember.inject.service(),

  init() {
    this._super(...arguments);

    if (!this.get('computedAttributes')) { return; }

    var query = this.get('store').findAll('attribute').then((attributes) => {
      this.set('attributes', attributes);
    }).catch((error) => {
      Ember.Logger.error(`attribute records not found for computed attributes ${this.get('computedAttributes').join(',')}`, error);
    });

    this.get('computedAttributes').forEach((attributeName) => {
      this.set(attributeName, computedAttribute(attributeName));
    });

    this.deferRendering(query);
  }
});
