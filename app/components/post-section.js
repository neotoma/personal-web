import ComponentTransitionsMixin from 'personal-web/mixins/component-transitions';
import Ember from 'ember';

export default Ember.Component.extend(ComponentTransitionsMixin, {
  bodyShown: false,
  classNames: ['post'],
  store: Ember.inject.service(),
  tagName: 'section',

  didReceiveAttrs() {
    this.set('bodyShown', false); // hack to force component rerender

    var deferred = Ember.RSVP.defer();

    Ember.run.next(() => {
      if (this.get('isDestroyed')) {
        deferred.resolve();
        return;
      }

      this.set('bodyShown', true);

      if (this.get('post')) {
        this.set('loaded', true);
      }

      deferred.resolve();
    });

    this.deferRendering(deferred.promise);
  },

  showPostBody: Ember.computed('bodyShown', 'post', function() {
    return (this.get('bodyShown') && this.get('post'));
  })
});
