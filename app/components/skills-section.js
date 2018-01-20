import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['id'],
  classNames: ['skills'],
  id: 'skills',
  store: Ember.inject.service(),
  tagName: 'section',

  init() {
    this._super(...arguments);

    var query = this.get('store').findAll('skill').then((skills) => {
      this.set('featuredSkills', skills.filter(skill => skill.get('imageUrl')));
      this.set('skills', skills.filter(skill => !skill.get('imageUrl')));
    }).catch((error) => {
      this.handleError(error);
    });

    this.deferRendering(query);
  }
});
