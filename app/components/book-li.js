import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  tagName: 'li',

  book: Ember.computed('listing', function() {
    return this.get('listing');
  }),

  purchaseButtonLabel: Ember.computed('book.releasedAt', function() {
    return (this.get('book.pendingRelease')) ? 'Pre-Order Now' : 'Order Now';
  })
});
