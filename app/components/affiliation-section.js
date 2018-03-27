import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  attributeBindings: ['id'],
  classNameBindings: ['affiliation:notEmpty:empty'],
  classNames: ['affiliation'],
  id: 'affiliation',
  tagName: 'section',

  init() {
    this._super(...arguments);

    this.findOne('affiliation', {
      filter: {
        featured: "index"
      }
    }).then((affiliation) => {
      this.set('affiliation', affiliation);
    }).catch(() => {
      Ember.Logger.log(`affiliation-section initialized empty`);
    });
  },

  description: Ember.computed('affiliation.description', function() {
    return this.get('affiliation.longDescription') ? this.get('affiliation.longDescription') : this.get('affiliation.description');
  })
});
