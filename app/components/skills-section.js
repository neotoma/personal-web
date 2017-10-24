import Ember from 'ember';
import ScrollToUpdateAppNavMixin from '../mixins/scroll-to-update-app-nav';
import ComponentTransitionsMixin from '../mixins/component-transitions';

export default Ember.Component.extend(ScrollToUpdateAppNavMixin, ComponentTransitionsMixin, {
  appNavOption: 'Skills',
  tagName: 'section',
  classNames: ['skills'],
  attributeBindings: ['id'],
  id: 'skills',
  store: Ember.inject.service(),

  init() {
    this._super(...arguments);

    var query = this.get('store').findAll('skill').then((skills) => {
      this.set('featuredSkills', skills.filter(skill => skill.get('imageUrl')));
      this.set('skills', skills.filter(skill => !skill.get('imageUrl')));

      Ember.run.next(() => {
        this.set('loaded', true);
      });
    }).catch((error) => {
      this.handleError(error);
    });

    this.deferRendering(query);
  },

  empty: Ember.computed('skills.length', function() {
    return (this.get('skills.length') === 0);
  })
});
