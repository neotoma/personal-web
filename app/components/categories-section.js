import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  attributeBindings: ['id'],
  classNameBindings: ['categories.length:notEmpty:empty'],
  classNames: ['categories'],
  id: 'categories',
  tagName: 'div',

  init() {
    this._super(...arguments);

    this.findAll('category', {
      include: 'posts'
    }).then((categories) => {
      this.set('categories', categories);
    }).catch(() => {
      Ember.Logger.log('categories-section initialized empty');
    });
  }
});
