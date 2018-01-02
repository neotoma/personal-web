import Ember from 'ember';

export default Ember.Component.extend({
  appNavOption: 'Check-ins',
  attributeBindings: ['id'],
  classNames: ['checkins'],
  fastboot: Ember.inject.service(),
  id: 'checkins',
  limit: 25,
  sort: '-created-at',
  sortedCheckinsProperties: ['createdAt:desc'],
  sortedCheckins: Ember.computed.sort('checkins', 'sortedCheckinsProperties'),
  store: Ember.inject.service(),
  tagName: 'section',

  init: function() {
    this._super(...arguments);

    if (this.get('fastboot.isFastBoot')) {
      var query = this.get('store').query('checkin', {
        limit: this.get('limit'),
        offset: this.get('offset'),
        sort: this.get('sort')
      }).then((checkins) => {
        this.set('checkins', checkins);
        this.get('fastboot.shoebox').put('checkins', checkins.map((checkin) => checkin.toJSON()));
        this.set('loaded', true);
      }).catch((error) => {
        this.handleError(error);
      });

      this.deferRendering(query);
    } else {
      this.set('checkins', this.get('fastboot.shoebox').retrieve('checkins'));

      Ember.run.next(() => {
        this.set('loaded', true);
      });
    }
  },

  empty: Ember.computed('checkins.length', function() {
    return (this.get('checkins.length') === 0);
  })
});
