import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['post'],
  tagName: 'section',

  didReceiveAttrs() {
    this.set('bodyReady', false); // hack to force component rerender

    var deferred = Ember.RSVP.defer();

    Ember.run.next(() => {
      if (this.get('isDestroyed')) {
        deferred.resolve();
        return;
      }

      this.set('bodyReady', true);
      deferred.resolve();
    });

    this.deferRendering(deferred.promise);
  },

  bodyReady: Ember.computed('bodyReady', 'post', function() {
    return (this.get('bodyReady') && this.get('post'));
  })
});
