import Ember from 'ember';
import HeadData from 'ember-cli-head/services/head-data';
import { observer } from '@ember/object';

export default HeadData.extend({
  segment: Ember.inject.service(),
  tags: [
    'articleAuthor',
    'articleModifiedTime',
    'articlePublishedTime',
    'canonicalUrl',
    'description',
    'firstName',
    'gender',
    'imageUrl',
    'lastName',
    'title',
    'type'
  ],

  clearData() {
    this.get('tags').forEach((tag) => {
      this.set(tag, null);
    });
  },

  trackPageView: observer('title', function() {
    if (!this.get('title')) { return; }

    Ember.run.next(() => {
      this.get('segment').trackPageView();
    });
  })
});
