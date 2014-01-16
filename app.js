/* Ember Init */

App = Ember.Application.create();

App.TemplateNames = [
  'application',
  'index',
  'post'
];

for (var i = 0; i < App.TemplateNames.length; i++) {
  $.ajax({
    url: 'templates/' + App.TemplateNames[i] + '.hbs',         
    async: false,
    success: function (response) {
      Ember.TEMPLATES[App.TemplateNames[i]] = Ember.Handlebars.compile(response);
    }
  });
}

App.Router.map(function() {
  this.route('index', { path: '/' });
  //this.resource('posts');
  this.resource('post', { path: '/post/:post_id' });
});