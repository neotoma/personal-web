import Ember from 'ember';

export default Ember.Route.extend({
  appNavOptions: [{
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
  }]
});