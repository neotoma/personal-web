import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['href'],
  tagName: 'li',

  init() {
    this._super(...arguments);

    if (this.get('company.url')) {
      this.set('href', this.get('company.url'));
      this.set('tagName', 'a');
    }
  }
});
