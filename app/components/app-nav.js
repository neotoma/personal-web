import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['app'],
  computedAttributes: ['fullName', 'imageUrl'],
  tagName: 'nav'
});
