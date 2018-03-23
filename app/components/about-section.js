import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['id'],
  classNameBindings: ['expanded', 'about:notEmpty:empty'],
  classNames: ['about'],
  computedAttributes: ['about', 'birthday', 'firstName'],
  id: 'about',
  store: Ember.inject.service(),
  tagName: 'section',
  today: Date(),

  hasDates: Ember.computed('birthday', 'today', function() {
    return (this.get('birthday') && this.get('today'));
  }),

  actions: {
    expand() {
      this.set('expanded', true);
    }
  }
});
