import ComponentTransitionsMixin from 'personal-web/mixins/component-transitions';
import computedFirstObject from 'personal-web/utils/computed-first-object';
import Ember from 'ember';
import ScrollToUpdateAppNavMixin from 'personal-web/mixins/scroll-to-update-app-nav';

export default Ember.Component.extend(ComponentTransitionsMixin, ScrollToUpdateAppNavMixin, {
  appNavOption: 'Intro',
  attributeBindings: ['id'],
  classNames: ['intro'],
  computedAttributes: ['coverImageUrl', 'fullName', 'homeLocation', 'profession'],
  id: 'intro',
  lastCheckin: computedFirstObject('checkins'),
  lastGeolocation: computedFirstObject('geolocations'),
  lastUpdate: computedFirstObject('updates'),
  lastWeatherExperience: computedFirstObject('weatherExperiences'),
  store: Ember.inject.service(),
  tagName: 'section',

  hasLastObjects: Ember.computed('lastCheckin', 'lastGeolocation', 'lastUpdate', 'lastWeatherExperience', function() {
    return (this.get('lastCheckin') || this.get('lastGeolocation') || this.get('lastUpdate') || this.get('lastWeatherExperience'));
  }),

  imageStyle: Ember.computed('attributes.@each.value', function() {
    var coverImageUrl = this.get('coverImageUrl');

    if (coverImageUrl) {
      return Ember.String.htmlSafe(`background-image: url(${coverImageUrl}`);
    }
  }),

  init() {
    this._super(...arguments);

    var query = this.get('store').findAllForNames([
      'attribute',
      'checkin',
      'geolocation',
      {
        name: 'update',
        include: 'post'
      },
      'weatherExperience'
    ]).then((models) => {
      Object.keys(models).forEach((key) => {
        this.set(key, models[key]);
      });

      this.set('loaded', true);
    }).catch((error) => {
      this.handleError(error);
    });

    this.deferRendering(query);
  }
});
