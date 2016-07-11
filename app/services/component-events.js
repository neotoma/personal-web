import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {
  hideAll() {
    this.trigger('hideAll');
  }
});