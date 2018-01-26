import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['panoramic'],
  classNames: ['photo'],
  tagName: 'section',

  imageUrl: Ember.computed('photo.imageUrl', 'photo.largeImageUrl', function() {
    if (this.get('photo.largeImageUrl')) {
      return this.get('photo.largeImageUrl');
    } else if (this.get('photo.imageUrl')) {
      return this.get('photo.imageUrl');
    }
  }),

  panoramic: Ember.computed('photo.height', 'photo.width', function() {
    return (this.get('photo.width') / this.get('photo.height') > 4);
  })
});
