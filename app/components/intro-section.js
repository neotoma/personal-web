import Ember from 'ember';
import ScrollToUpdateAppNavMixin from '../mixins/scroll-to-update-app-nav';
import ComponentTransitionsMixin from '../mixins/component-transitions';

export default Ember.Component.extend(ScrollToUpdateAppNavMixin, ComponentTransitionsMixin, {
  tagName: 'section',
  classNames: ['intro'],
  attributeBindings: ['id'],
  appNavOption: 'Intro',
  id: 'intro',
  store: Ember.inject.service(),

  imageStyle: Ember.computed('coverImageUrl', function() {
    if (this.get('coverImageUrl')) {
      return Ember.String.htmlSafe('background-image: url(' + this.get('coverImageUrl') + ')');
    }
  }),

  init() {
    this._super(...arguments);
    var self = this;

    Ember.RSVP.hash({
      attributes: this.get('store').findAll('attribute'),
      checkins: this.get('store').findAll('checkin'),
      geolocations: this.get('store').findAll('geolocation'),
      updates: this.get('store').findAll('update'),
      weatherExperiences: this.get('store').findAll('weatherExperience')
    }).then(function(model) {
      var coverImageUrl = model.attributes.findBy('id', 'coverImageUrl');
      var fullName = model.attributes.findBy('id', 'fullName');
      var profession = model.attributes.findBy('id', 'profession');
      var homeLocation = model.attributes.findBy('id', 'homeLocation');

      if (coverImageUrl && coverImageUrl.get('value')) {
        self.set('coverImageUrl', coverImageUrl.get('value'));
      }

      if (fullName && fullName.get('value')) {
        self.set('fullName', fullName.get('value'));
      } else {
        self.handleError(new Error('No fullName property available'));
      }

      if (profession && profession.get('value')) {
        self.set('profession', profession.get('value'));
      }

      if (homeLocation && homeLocation.get('value')) {
        self.set('homeLocation', homeLocation.get('value'));
      }

      self.set('lastCheckin', model.checkins.objectAt(0));
      self.set('lastGeolocation', model.geolocations.objectAt(0));
      self.set('lastUpdate', model.updates.objectAt(0));
      self.set('lastWeatherExperience', model.weatherExperiences.objectAt(0));

      Ember.run.next(function() {
        self.set('loaded', true);
      });
    }).catch(function(error) {
      self.handleError(error);
    });
  },

  hasLastObjects: Ember.computed('lastCheckin', 'lastGeolocation', 'lastUpdate', 'lastWeatherExperience', function() {
    return (this.get('lastCheckin') || this.get('lastGeolocation') || this.get('lastUpdate') || this.get('lastWeatherExperience'));
  })
});