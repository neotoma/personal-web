import attr from 'ember-data/attr';
import Ember from 'ember';
import Model from 'ember-data/model';

export default Model.extend({
  imageType: 'logo',
  name: attr('string'),
  tagline: attr('string'),
  logoUrl: attr('string'),
  publishedAt: attr('date'),
  startedAt: attr('date'),
  url: attr('string'),

  description: Ember.computed('tagline', function() {
    return this.get('tagline');
  }),

  imageUrl: Ember.computed('logoUrl', function() {
    return this.get('logoUrl');
  })
});
