import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['post'],
  tagName: 'section',

  didReceiveAttrs() {
    this.set('bodyResolved', false); // hack to force component rerender

    var deferred = Ember.RSVP.defer();

    Ember.run.next(() => {
      if (this.get('isDestroyed')) {
        deferred.resolve();
        return;
      }

      this.set('bodyResolved', true);
      deferred.resolve();
    });

    this.deferRendering(deferred.promise);
  },

  bodyReady: Ember.computed('bodyResolved', 'post', 'post.body', function() {
    return (this.get('bodyResolved') && this.get('post') && this.get('post.body'));
  })
});
