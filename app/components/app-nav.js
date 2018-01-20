import Ember from 'ember';

export default Ember.Component.extend({
  appNav: Ember.inject.service(),
  classNames: ['app'],
  computedAttributes: ['fullName', 'imageUrl'],
  tagName: 'nav'
});
