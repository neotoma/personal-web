import Ember from 'ember';

export default Ember.Route.extend({
  intl: Ember.inject.service(),
  locale: 'en-us',

  beforeModel() {
    this.get('intl').setLocale(this.get('locale'));
  }
});
