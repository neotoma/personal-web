import Component from '@ember/component';

export default Component.extend({
  classNames: ['create-message'],
  router: Ember.inject.service(),
  tagName: 'section',

  init() {
    this._super(...arguments);
    this.set('message', this.get('store').createRecord('message'));
  },

  actions: {
    sendMessage() {
      this.get('message').save().then(() => {
        this.get('router').transitionTo('message-sent');
      }).catch((error) => {
        alert(`Sorry, we couldn't send your message because of the following error:\n\n${error}`);
      });
    }
  }
});
