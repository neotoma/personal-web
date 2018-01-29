import Ember from 'ember';
import ListingMixin from 'personal-web/mixins/listing';

export default Ember.Component.extend(ListingMixin, {
  classNameBindings: [
    'format',
    'hasContent:hasContent:hasNoContent',
    'hasImage:hasImage:hasNoImage',
    'hasHeader:hasHeader:hasNoHeader'],
  tagName: 'li'
});
