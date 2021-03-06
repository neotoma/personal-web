import attribute from 'personal-web/utils/attribute';
import Ember from 'ember';
import removeMarkdown from 'npm:remove-markdown';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  model(params) {
    return Ember.RSVP.hash({
      attributes: this.store.findAll('attribute'),
      photo: this.store.findRecord('photo', params.photo_id)
    });
  },

  setupController(controller, models) {
    let photo = models['photo'];
    controller.set('photo', photo);

    this.set('headData.canonicalUrl', attribute(models['attributes'], 'url') + this.router.generate('photo', photo.get('id')));
    this.set('headData.imageHeight', photo.get('height'));
    this.set('headData.imageUrl', photo.get('imageUrl'));
    this.set('headData.imageWidth', photo.get('width'));
    this.set('headData.title', photo.get('description') ? removeMarkdown(photo.get('description')) : 'Photo');
  },

  actions: {
    error(error) {
      if (error) {
        this.intermediateTransitionTo('not-found', error);
      }
    }
  }
});
