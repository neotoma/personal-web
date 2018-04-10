import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  classNameBindings: ['book.coverImageUrl:hasImage:hasNoImage'],
  tagName: 'li',

  book: Ember.computed('listing', function() {
    return this.get('listing');
  }),

  purchaseButtonLabel: Ember.computed('book.releasedAt', function() {
    return (this.get('book.pendingRelease')) ? 'Pre-Order Now' : 'Order Now';
  }),

  linkLabel: Ember.computed('book.description', 'book.preview', function() {
    if (this.get('book.preview')) {
      return 'Read preview';
    } else if (this.get('book.description')) {
      return 'Read description';
    }
  })
});
