import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),
  intl: Ember.inject.service(),
  locale: 'en-us',
  store: Ember.inject.service(),

  beforeModel() {
    this.get('intl').setLocale(this.get('locale'));
  }
});
