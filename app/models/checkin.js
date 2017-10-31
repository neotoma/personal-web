import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  createdAt: attr('date'),
  foursquareVenueId: attr('string'),
  placeName: attr('string'),
  placeCity: attr('string'),

  placeUrl: Ember.computed('foursquareVenueId', function() {
    if (!this.get('foursquareVenueId')) { return; }

    return `http://foursquare.com/v/${this.get('foursquareVenueId')}`;
  })
});
