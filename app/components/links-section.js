import Ember from 'ember';
import ScrollToUpdateAppNavMixin from 'personal-web/mixins/scroll-to-update-app-nav';
import ComponentTransitionsMixin from 'personal-web/mixins/component-transitions';

export default Ember.Component.extend(ScrollToUpdateAppNavMixin, ComponentTransitionsMixin, {
  appNavOption: 'Links',
  attributeBindings: ['id'],
  classNames: ['links'],
  id: 'links',
  links: [],
  sortedLinksProperties: ['name:asc'],
  sortedLinks: Ember.computed.sort('links', 'sortedLinksProperties'),
  store: Ember.inject.service(),
  tagName: 'section',

  init() {
    this._super(...arguments);

    var query = this.get('store').findAll('link').then((links) => {
      this.set('links', links);

      Ember.run.next(() => {
        this.set('loaded', true);
      });
    }).catch((error) => {
      this.handleError(error);
    });

    this.deferRendering(query);
  },

  empty: Ember.computed('links.length', function() {
    return (this.get('links.length') === 0);
  })
});
