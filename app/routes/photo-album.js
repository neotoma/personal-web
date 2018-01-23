import attribute from 'personal-web/utils/attribute';
import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  model(params) {
    return Ember.RSVP.hash({
      photoAlbum: this.store.findRecord('photoAlbum', params.photo_album_id, { include: 'photos' }),
      attributes: this.store.findAll('attribute'),
    });
  },

  setupController(controller, models) {
    var photoAlbum = models['photoAlbum'];
    controller.set('photoAlbum', photoAlbum);

    this.set('headData.canonicalUrl', attribute(models['attributes'], 'url') + this.router.generate('photo-album', photoAlbum.get('id')));
    this.set('headData.description', photoAlbum.get('description'));
    //this.set('headData.imageUrl', photoAlbum.get('imageUrl'));
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
