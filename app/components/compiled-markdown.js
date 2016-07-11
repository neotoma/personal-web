import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  layout: Ember.computed('markdown', function() {
    var converter = new showdown.Converter();
    var regex = /\$([a-z]+?)-([a-z0-9]+?)/gi;
    var match;

    while ((match = regex.exec(this.get('markdown'))) !== null) {
      this.set(match[0], this.get('store').findRecord(match[1], match[2]));
    }

    var html = converter.makeHtml(this.get('markdown'));
    
    return Ember.HTMLBars.compile(html);
  })
});