import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  imageUrl: attr('string'),
  description: attr('string'),
  width: attr('number'),
  height: attr('number'),

  dimensions: Ember.computed('firstName', 'lastName', function() {
    if (this.get('width') && this.get('height')) {
      return this.get('width') + 'x' + this.get('height');
    }
  })
});