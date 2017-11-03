import Ember from 'ember';

export default Ember.computed('height', 'width', function() {
  if (!this.get('height') || !this.get('width')) { return; }

  if (this.get('height') === this.get('width')) {
    return 'square';
  } else if (this.get('height') > this.get('width')) {
    return 'portrait';
  } else {
    return 'landscape';
  }
});
