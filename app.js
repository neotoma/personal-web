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
  this.resource('post', { path: '/post/:post_id' });
});

var ApplicationAdapterNameSpace = 'data';

if (location.hostname == 'markmhx.github.io') {
  ApplicationAdapterNameSpace = 'markmhendrickson/data'
}

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: ApplicationAdapterNameSpace,

  buildURL: function(type, id) {
    var url = this._super(type, id);

    if (!id) {
      url = url + '-all';
    }

    return url;
  }
});