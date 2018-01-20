import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['id'],
  classNameBindings: ['limit:limited'],
  classNames: ['checkins'],
  id: 'checkins',
  sortedCheckinsProperties: ['createdAt:desc'],
  sortedCheckins: Ember.computed.sort('checkins', 'sortedCheckinsProperties'),
  store: Ember.inject.service(),
  tagName: 'section',

  init: function() {
    this._super(...arguments);

    var query = this.get('store').findAll('checkin', {
      limit: this.get('limit'),
      sort: '-created-at'
    }).then((checkins) => {
      this.set('checkins', checkins);
    }).catch((error) => {
      this.handleError(error);
    });

    this.deferRendering(query);
  }
});
