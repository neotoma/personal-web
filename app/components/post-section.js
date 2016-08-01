import Ember from 'ember';
import ComponentTransitionsMixin from '../mixins/component-transitions';

export default Ember.Component.extend(ComponentTransitionsMixin, {
  tagName: 'section',
  classNames: ['post'],
  store: Ember.inject.service(),
  bodyShown: false,

  didReceiveAttrs() {
    var self = this;
    this.set('bodyShown', false); // hack to force component rerender 

    Ember.run.next(function() {
      if (self.get('isDestroyed')) { return; }
      
      self.set('bodyShown', true);

      if (self.get('post')) {
        self.set('loaded', true);
      }
    });
  },

  showPostBody: Ember.computed('bodyShown', 'post', function() {
    return (this.get('bodyShown') && this.get('post'));
  })
});