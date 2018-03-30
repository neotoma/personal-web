import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  attributeBindings: ['id'],
  classNameBindings: ['category:notEmpty:empty'],
  classNames: ['category'],

  id: Ember.computed('category.id', function() {
    return `category-${this.get('category.id')}`;
  })
});
