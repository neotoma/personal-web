import Component from '@ember/component';

export default Component.extend({
  tagName: 'li',

  book: Ember.computed('listing', function() {
    return this.get('listing');
  }),

  purchaseButtonLabel: Ember.computed('book.releasedAt', function() {
    return (Date.now() - this.get('book.releasedAt') < 0) ? 'Pre-Order Now' : 'Order Now';
  })
});
