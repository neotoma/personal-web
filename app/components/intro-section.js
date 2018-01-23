import Ember from 'ember';
import { pluralize } from 'ember-inflector';

let hasModelRecords = function(modelName) {
  return Ember.computed(`models.${pluralize(modelName)}[]`, function() {
    return (this.get(`models.${pluralize(modelName)}.state`) === 'fulfilled');
  });
};

export default Ember.Component.extend({
  attributeBindings: ['id'],
  classNameBindings: ['hidden'],
  classNames: ['intro'],
  computedAttributes: ['coverImageUrl', 'fullName', 'homeLocation', 'profession'],
  id: 'intro',
  tagName: 'section',

  hasCheckins: hasModelRecords('checkin'),
  hasCompanies: hasModelRecords('company'),
  hasLinks: hasModelRecords('link'),
  hasPhotos: hasModelRecords('photo'),
  hasPosts: hasModelRecords('post'),
  hasSkills: hasModelRecords('skill'),

  hidden: Ember.computed('tagName', 'fullName', 'subheader', function() {
    return !(this.get('coverImageUrl') && this.get('fullName') && this.get('subheader'));
  }),

  imageStyle: Ember.computed('attributes.@each.value', function() {
    var coverImageUrl = this.get('coverImageUrl');

    if (coverImageUrl) {
      return Ember.String.htmlSafe(`background-image: url(${coverImageUrl}`);
    }
  }),

  init() {
    this._super(...arguments);

    var query = Ember.RSVP.hashSettled({
      attributes: this.get('store').findAll('attribute'),
      checkins: this.get('store').findAll('checkin', { limit: 1 }),
      companies: this.get('store').findAll('company', { limit: 1 }),
      links: this.get('store').findAll('link', { limit: 1 }),
      photos: this.get('store').findAll('photo', { limit: 1 }),
      posts: this.get('store').findAll('post', { limit: 1 }),
      skills: this.get('store').findAll('skill', { limit: 1 })
    }).then((models) => {
      this.set('models', models);
    });

    this.deferRendering(query);
  },

  subheader: Ember.computed('profession', 'homeLocation', function() {
    if (this.get('profession') && this.get('homeLocation')) {
      return `${this.get('profession')} based in ${this.get('homeLocation')}`;
    }
  })
});
