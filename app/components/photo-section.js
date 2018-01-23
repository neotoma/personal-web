import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['panoramic'],
  classNames: ['photo'],
  tagName: 'section',

  panoramic: Ember.computed('photo.height', 'photo.width', function() {
    return (this.get('photo.width') / this.get('photo.height') > 4);
  })
});
