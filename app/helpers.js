Ember.Handlebars.registerBoundHelper('markdown', function (content) {
  if (content) {
    return new Handlebars.SafeString(markdown.toHTML(content));
  }
});