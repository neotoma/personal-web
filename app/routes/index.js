import Ember from 'ember';
import PhotoSwipeMixin from '../mixins/photoswipe';

export default Ember.Route.extend(PhotoSwipeMixin, {
  model() {
    return Ember.RSVP.hash({
      attributes: this.store.findAll('attribute'),
      checkins: this.store.findAll('checkin'),
      companies: this.store.findAll('company'),
      geolocations: this.store.findAll('geolocation'),
      links: this.store.findAll('link'),
      posts: this.store.findAll('post'),
      positions: this.store.findAll('position'),
      photos: this.store.findAll('photo'),
      skills: this.store.findAll('skill'),
      updates: this.store.findAll('update'),
      weatherExperiences: this.store.findAll('weatherExperience')
    });
  },

  setupController(controller, model) {
    controller.set('coverImageUrl', model.attributes.findBy('id', 'coverImageUrl').get('value'));
    controller.set('fullName', model.attributes.findBy('id', 'fullName').get('value'));
    controller.set('profession', model.attributes.findBy('id', 'profession').get('value'));
    controller.set('homeLocation', model.attributes.findBy('id', 'homeLocation').get('value'));
    controller.set('history', model.attributes.findBy('id', 'history').get('value'));
    controller.set('birthday', model.attributes.findBy('id', 'birthday').get('value'));

    controller.set('today', Date());

    controller.set('lastCheckin', model.checkins.shiftObject());
    controller.set('lastWeatherExperience', model.weatherExperiences.shiftObject());
    controller.set('lastGeolocation', model.geolocations.shiftObject());
    controller.set('lastUpdate', model.updates.shiftObject());

    controller.set('companies', model.companies);
    controller.set('photos', model.photos);
    controller.set('links', model.links);
    controller.set('featuredPost', model.posts.shiftObject());
    controller.set('featuredPosts', model.posts.slice(0,6));
    controller.set('morePosts', model.posts.slice(6,30));
    controller.set('featuredSkills', model.skills.filter(s => s.get('imageUrl')));
    controller.set('skills', model.skills.filter(s => !s.get('imageUrl')));
  }
});