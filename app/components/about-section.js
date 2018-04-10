import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    expand() {
      this.set('expanded', true);
    }
  },

  attributeBindings: ['id'],
  classNameBindings: ['expanded', 'about:notEmpty:empty', 'showImage:hasImage:hasNoImage'],
  classNames: ['about'],

  computedAttributes: [
    'about',
    'coverImageSection',
    'coverImageUrl',
    'birthday',
    'firstName'
  ],

  id: 'about',
  store: Ember.inject.service(),
  tagName: 'section',
  today: Date(),

  hasDates: Ember.computed('birthday', 'today', function() {
    return (this.get('birthday') && this.get('today'));
  }),

  showImage: Ember.computed('coverImageUrl', 'coverImageSection', function() {
    return (this.get('coverImageUrl') && this.get('coverImageSection') === 'about');
  })
});
