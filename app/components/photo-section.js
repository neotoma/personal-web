import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isPanoramic:panoramic'],
  classNames: ['photo'],
  tagName: 'section',

  imageUrl: Ember.computed('photo.imageUrl', 'photo.largeImageUrl', function() {
    if (this.get('isPanoramic') && this.get('photo.panoramicImageUrl')) {
      return this.get('photo.panoramicImageUrl');
    } else if (this.get('photo.largeImageUrl')) {
      return this.get('photo.largeImageUrl');
    } else if (this.get('photo.imageUrl')) {
      return this.get('photo.imageUrl');
    }
  }),

  isPanoramic: Ember.computed('photo.height', 'photo.width', function() {
    return (this.get('photo.width') / this.get('photo.height') > 4);
  })
});
