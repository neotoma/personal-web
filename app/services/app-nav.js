import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {
  options: null,

  show() {
    this.trigger('show');
  }
});
