import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['id'],
  classNames: ['intro'],
  computedAttributes: ['coverImageUrl', 'fullName', 'homeLocation', 'profession'],
  id: 'intro',
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

  subheader: Ember.computed('profession', 'homeLocation', function() {
    return `${this.get('profession')} based in ${this.get('homeLocation')}`;
  })
});
