import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['id'],
  classNameBindings: ['skills.length:notEmpty:empty'],
  classNames: ['skills'],
  id: 'skills',
  store: Ember.inject.service(),
  tagName: 'section',

  init() {
    this._super(...arguments);

    this.findAll('skill').then((skills) => {
      this.set('featuredSkills', skills.filter(skill => skill.get('imageUrl')));
      this.set('skills', skills.filter(skill => !skill.get('imageUrl')));
    }).catch(() => {
      Ember.Logger.log('skills-section initialized empty');
    });
  }
});
