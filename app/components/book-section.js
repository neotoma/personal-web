import Component from '@ember/component';

export default Component.extend({
  classNames: ['book'],
  tagName: 'section',

  purchaseButtonLabel: Ember.computed('book.releasedAt', function() {
    return (this.get('book.pendingRelease')) ? 'Pre-Order Now' : 'Order Now';
  }),
});
