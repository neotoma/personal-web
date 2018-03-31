import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  attributeBindings: ['id'],
  classNameBindings: ['category:notEmpty:empty'],
  classNames: ['category'],
  postsProperties: ['publishedAt:desc'],
  posts: Ember.computed.sort('category.posts', 'postsProperties'),

  id: Ember.computed('category.id', function() {
    return `category-${this.get('category.id')}`;
  }),

  viewAllLabel: Ember.computed('category.name', function() {
    return `View all ${this.get('category.name')}`;
  })
});
