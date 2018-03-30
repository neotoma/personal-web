import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['id'],
  classNameBindings: ['empty:empty:notEmpty'],
  classNames: ['intro'],
  computedAttributes: ['about', 'coverImageUrl', 'fullName', 'homeLocation', 'profession'],
  id: 'intro',
  tagName: 'section',

  empty: Ember.computed('coverImageUrl', 'fullName', 'subheader', function() {
    return !(this.get('coverImageUrl') || this.get('fullName') || this.get('subheader'));
  }),

  init() {
    this._super(...arguments);

    this.queryHash({
      affiliation: this.findOneFeatured('affiliation', 'index'),
      book: this.findOne('book'),
      categories: this.findAll('category'),
      checkin: this.findOne('checkin'),
      company: this.findOne('company'),
      link: this.findOne('link'),
      photo: this.findOne('photo'),
      post: this.findOne('post'),
      project: this.findOneFeatured('project', 'index'),
      publication: this.findOne('publication'),
      skill: this.findOne('skill')
    }).then((models) => {
      Object.keys(models).forEach((modelName) => {
        this.set(modelName, models[modelName].value);
      });
    });
  },

  subheader: Ember.computed('profession', 'homeLocation', function() {
    if (this.get('profession') && this.get('homeLocation')) {
      return `${this.get('profession')} based in ${this.get('homeLocation')}`;
    } else if (this.get('profession')) {
      return this.get('profession');
    } else if (this.get('homeLocation')) {
      return this.get('homeLocation');
    }
  })
});
