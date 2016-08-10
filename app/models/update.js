import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  photo: belongsTo('photo'),
  post: belongsTo('post'),

  description: Ember.computed('photo.description', 'post.title', function() {
    if (this.get('photo.description')) {
      return this.get('photo.description');
    } else if (this.get('post.title')) {
      return this.get('post.title');
    }
  })
});