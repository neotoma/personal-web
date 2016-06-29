import Ember from 'ember';
import ScrollToUpdateAppNavMixin from '../mixins/scroll-to-update-app-nav';

export default Ember.Component.extend(ScrollToUpdateAppNavMixin, {
  appNavOption: 'Links',
  tagName: 'section',
  classNames: ['links'],
  classNameBindings: ['shown'],
  attributeBindings: ['id'],
  id: 'links',
  store: Ember.inject.service(),

  init() {
    this._super(...arguments);
    var self = this;

    this.get('store').findAll('link').then(function(links) {
      self.set('links', links);
      
      Ember.run.next(function() {
        self.set('shown', true);
      });
    });
  }
});
