import Ember from 'ember';

export default Ember.Mixin.create(Ember.Evented, {
  componentEvents: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.get('componentEvents').on('hideAll', this, this.hide);
  },

  didDestroyElement() {
    this.get('componentEvents').off('hideAll', this, this.hide);
  },

  hide() {
    this.set('hidden', true);
  }
});