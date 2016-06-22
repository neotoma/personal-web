import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  photo: belongsTo('photo'),

  description: function() {
    if (this.get('photo')) {
      return this.get('photo.description');
    }
  }.property('photo.description')
});