import Ember from 'ember';

export default Ember.Mixin.create({
  tagName: 'div',
  classNameBindings: ['loaded', 'hidden']
});
