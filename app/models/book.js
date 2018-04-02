import attr from 'ember-data/attr';
import Ember from 'ember';
import Model from 'ember-data/model';

export default Model.extend({
  description: attr('string'),
  publishedAt: attr('date'),
  releasedAt: attr('date'),
  publisher: attr('string'),
  title: attr('string'),
  subtitle: attr('string'),
  purchaseUrl: attr('string'),
  publisherUrl: attr('string'),
  preview: attr('string'),
  coverImageUrl: attr('string'),
  testimonials: attr(),

  pendingRelease: Ember.computed('releasedAt', function() {
    if (!this.get('releasedAt')) { return true; }

    return (this.get('releasedAt') > new Date(Date.now()));
  }),

  isNew: Ember.computed('releasedAt', function() {
    if (!this.get('releasedAt')) { return true; }

    let daysSinceRelease = (this.get('releasedAt') - Date.now()) / -(1000 * 3600 * 24);
    return (daysSinceRelease <= 365);
  })
});
