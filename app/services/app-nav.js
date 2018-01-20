import Ember from 'ember';

export default Ember.Service.extend({
  hidden: false,

  shown: Ember.computed('hidden', function() {
    return !this.get('hidden');
  })
});
