import Ember from 'ember';

export default Ember.Mixin.create({
  tagName: 'div',
  classNameBindings: ['loaded', 'hidden', 'error', 'empty'],

  handleError(error) {
    console.error(error.message);
    this.set('error', true);
  },

  notLoaded: Ember.computed('loaded', function() {
    return !this.get('loaded');
  })
});
