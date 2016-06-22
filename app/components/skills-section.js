import Ember from 'ember';
import ScrollToUpdateAppNavMixin from '../mixins/scroll-to-update-app-nav';

export default Ember.Component.extend(ScrollToUpdateAppNavMixin, {
  appNavOption: 'Skills',
  tagName: 'section',
  classNames: ['skills'],
  classNameBindings: ['shown'],
  attributeBindings: ['id'],
  id: 'skills',
  store: Ember.inject.service(),

  init() {
    this._super(...arguments);
    var self = this;

    this.get('store').findAll('skill').then(function(skills) {
      self.set('featuredSkills', skills.filter(s => s.get('imageUrl')));
      self.set('skills', skills.filter(s => !s.get('imageUrl')));
      self.set('shown', true);
    });
  }
});
