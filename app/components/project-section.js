import Component from '@ember/component';

export default Component.extend({
  attributeBindings: ['id'],
  classNameBindings: ['project:notEmpty:empty'],
  classNames: ['project'],
  id: 'project',
  tagName: 'section',

  init() {
    this._super(...arguments);

    this.findOne('project').then((project) => {
      this.set('project', project);
    }).catch(() => {
      Ember.Logger.log(`project-section initialized empty`);
    });
  },
});
