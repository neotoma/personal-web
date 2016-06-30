import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  model() {
    return this.store.findAll('attribute');
  },

  afterModel(model) {
    var self = this;
    this.set('headData.type', 'profile');
    this.set('headData.imageUrl', model.findBy('id', 'imageUrl').get('value'));
    this.set('headData.description', model.findBy('id', 'description').get('value'));
    this.set('headData.profileFirstName', model.findBy('id', 'firstName').get('value'));
    this.set('headData.profileLastName', model.findBy('id', 'lastName').get('value'));
    this.set('headData.profileGender', model.findBy('id', 'gender').get('value'));

    Ember.run.next(function() {
      self.set('headData.url', document.location.origin);
    });
  },

  appNavOptions: [{
    'name': 'Intro',
    'anchor': '#intro'
  }, {
    'name': 'History',
    'anchor': '#history'
  }, {
    'name': 'Photos',
    'anchor': '#photos'
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
});