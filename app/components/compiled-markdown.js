import Ember from 'ember';
import showdown from 'showdown';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.loadRecords();
  },

  loadRecords() {
    var regex = /\$([a-z]+?)-([a-z0-9-]+)?/gi;
    var match;
    var promises = [];

    while ((match = regex.exec(this.get('markdown'))) !== null) {
      promises.push(this.get('store').findRecord(match[1], match[2]));
    }

    this.deferRendering(Ember.RSVP.all(promises).then((records) => {
      records.forEach((record) => {
        this.set(`$post-${record.get('id')}`, record);
      });
    }));
  },

  layout: Ember.computed('markdown', function() {
    var converter = new showdown.Converter();
    return Ember.HTMLBars.compile(converter.makeHtml(this.get('markdown')));
  })
});
