App.MarkdownHelper = Ember.Helper.helper(function (content) {
  if (content) {
    return new Handlebars.SafeString(markdown.toHTML(content));
  }
});

//Swag.registerHelpers();