import Ember from 'ember';

export default Ember.Route.extend({
  intl: Ember.inject.service(),
  headData: Ember.inject.service(),
  locale: 'en-us',

  beforeModel() {
    return this.get('intl').setLocale(this.get('locale'));
  },

  model() {
    return this.store.findAll('attribute');
  },

  setupController(controller, model) {
    var fullNameAttribute = model.findBy('id', 'fullName');
    var faviconUrlAttribute = model.findBy('id', 'faviconUrl');

    controller.set('fullNameAttribute', fullNameAttribute);
    this.set('headData.siteNameAttribute', fullNameAttribute);
    this.set('headData.locale', this.get('locale'));

    if (faviconUrlAttribute) {
      this.set('headData.faviconUrlAttribute', faviconUrlAttribute);
    }
  },

  title: function(tokens) {
   tokens = Ember.makeArray(tokens);
   tokens.unshift(this.get('controller.fullNameAttribute.value'));
   this.get('headData').set('tailTitleToken', tokens[tokens.length - 1]);
   return tokens.reverse().join(' - ');
  }
});