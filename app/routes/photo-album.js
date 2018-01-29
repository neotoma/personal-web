import attribute from 'personal-web/utils/attribute';
import Ember from 'ember';
import removeMarkdown from 'npm:remove-markdown';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  model(params) {
    return Ember.RSVP.hash({
      attributes: this.store.findAll('attribute'),
      photoAlbum: this.store.findRecord('photoAlbum', params.photo_album_id, { include: 'photos,coverPhoto' })
    });
  },

  setupController(controller, models) {
    var photoAlbum = models['photoAlbum'];
    controller.set('photoAlbum', photoAlbum);

    console.log(removeMarkdown(photoAlbum.get('description')));

    this.set('headData.canonicalUrl', attribute(models['attributes'], 'url') + this.router.generate('photo-album', photoAlbum.get('id')));
    this.set('headData.description', removeMarkdown(photoAlbum.get('description')));
    this.set('headData.imageUrl', photoAlbum.get('coverPhoto.largeImageUrl'));
    this.set('headData.title', photoAlbum.get('title'));
  },

  actions: {
    error(error) {
      if (error) {
        this.intermediateTransitionTo('not-found', error);
      }
    }
  }
});
