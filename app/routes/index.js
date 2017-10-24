import Ember from 'ember';

export default Ember.Route.extend({
  appNavOptions: [{
    'name': 'Intro',
    'anchor': '#intro'
  }, {
    'name': 'History',
    'anchor': '#history'
  }, {
    'name': 'Writing',
    'anchor': '#writing'
  }, {
    'name': 'Skills',
    'anchor': '#skills'
  }, {
    'name': 'Companies',
    'anchor': '#companies'
  }, {
    'name': 'Links',
    'anchor': '#links'
  }],

  headData: Ember.inject.service(),

  model() {
    return this.get('store').findAll('attribute');
  },

  setupController(controller, attributes) {
    attributes.forEach((attribute) => {
      this.get('headData').set(attribute.get('id'), attribute.get('value'));
    });

    this.set('headData.title', this.get('headData.fullName'));
    this.set('headData.type', 'profile');
  }
});
