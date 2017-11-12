import Ember from 'ember';
import ScrollToUpdateAppNavMixin from 'personal-web/mixins/scroll-to-update-app-nav';
import ComponentTransitionsMixin from 'personal-web/mixins/component-transitions';

export default Ember.Component.extend(ScrollToUpdateAppNavMixin, ComponentTransitionsMixin, {
  tagName: 'section',
  classNames: ['checkins'],
  attributeBindings: ['id'],
  id: 'checkins',
  limit: 25,
  appNavOption: 'Check-ins',
  store: Ember.inject.service(),
  sortedCheckinsProperties: ['createdAt:desc'],
  sortedCheckins: Ember.computed.sort('checkins', 'sortedCheckinsProperties'),

  init: function() {
    this._super(...arguments);

    var query = this.get('store').query('checkin', { limit: this.get('limit'), offset: this.get('offset') }).then((checkins) => {
      this.set('checkins', checkins);

      Ember.run.next(() => {
        this.set('loaded', true);
      });
    }).catch((error) => {
      this.handleError(error);
    });

    this.deferRendering(query);
  },

  empty: Ember.computed('checkins.length', function() {
    return (this.get('checkins.length') === 0);
  })
});
