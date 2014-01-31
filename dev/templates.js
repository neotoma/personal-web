this["Ember"] = this["Ember"] || {};
this["Ember"]["TEMPLATES"] = this["Ember"]["TEMPLATES"] || {};

this["Ember"]["TEMPLATES"]["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n    <div id=\"app-subtitle\">\n      ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      &#183;\n      ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.formatDate || depth0.formatDate),stack1 ? stack1.call(depth0, "subtitle", "%B %-d, %Y", options) : helperMissing.call(depth0, "formatDate", "subtitle", "%B %-d, %Y", options))));
  data.buffer.push(" \n    </div>\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("Mark Hendrickson");
  }

  data.buffer.push("<div id=\"app-header\">\n  <div id=\"app-title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "subtitle", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n<div id=\"app\">\n  <div id=\"content\">\n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  </div>\n</div>");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n      <li>\n        <div class=\"post-published-at\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0,depth0],types:["ID","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.formatDate || depth0.formatDate),stack1 ? stack1.call(depth0, "post.publishedAt", "%B %-d, %Y", options) : helperMissing.call(depth0, "formatDate", "post.publishedAt", "%B %-d, %Y", options))));
  data.buffer.push("</div>\n        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "post", "post", options) : helperMissing.call(depth0, "link-to", "post", "post", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </li>\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var hashTypes, hashContexts;
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "post.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  }

  data.buffer.push("<div id=\"bio\">\n  <h1>About</h1>\n  <p>I am a product designer and developer from San Francisco, CA with an extensive history of working on web and mobile applications.</p>\n  <p>My most recent work includes <a href=\"http://asheville.io\">Asheville</a> and <a href=\"http://getkite.co\">KITE</a>.</p>\n  <p>I've also designed for <a href=\"http://lift.do\">Lift</a>, led the team that built <a href=\"http://plancast.com\">Plancast</a> and worked for <a href=\"http://techcrunch.com/\">TechCrunch</a> as a writer, designer, and product manager.</p>\n  <p>I strive to create products that delight people and permanently improve their lives.</p>\n</div>\n\n<div id=\"profiles\">\n  <h1>Find me on</h1>\n  <ul>\n    <li><a href=\"https://about.me/mark\">About.me</a></li>\n    <li><a href=\"http://amzn.com/w/1ON8LLEQMTWIA\">Amazon</a></li>\n    <li><a href=\"https://angel.co/mhendric\">AngelList</a></li>\n    <li><a href=\"https://www.airbnb.com/users/show/4509964\">Airbnb</a></li>\n    <li><a href=\"https://www.behance.net/mhendric\">Behance</a></li>\n    <li><a href=\"http://dribbble.com/mhendric\">Dribbble</a></li>\n    <li><a href=\"https://news.ycombinator.com/user?id=mhendric\">Hacker News</a></li>\n    <li><a href=\"http://instagram.com/mhendric\">Instagram</a></li>\n    <li><a href=\"http://facebook.com/markmhendrickson\">Facebook</a></li>\n    <li><a href=\"https://foursquare.com/markymark\">Foursquare</a></li>\n    <li><a href=\"http://github.com/markmhx\">GitHub</a></li>\n    <li><a href=\"https://plus.google.com/+MarkHendrickson\">Google+</a></li>\n    <li><a href=\"http://www.linkedin.com/in/markmhendrickson\">LinkedIn</a></li>\n    <li><a href=\"https://medium.com/@markymark\">Medium</a></li>\n    <li><a href=\"http://www.pinterest.com/mhendric/\">Pinterest</a></li>\n    <li><a href=\"http://www.quora.com/Mark-Hendrickson\">Quora</a></li>\n    <li><a href=\"http://www.rdio.com/#/people/mhendric/\">Rdio</a></li>\n    <li><a href=\"http://stackoverflow.com/users/1816956/mark-hendrickson\">Stack Overflow</a></li>\n    <li><a href=\"http://twitter.com/markymark\">Twitter</a></li>\n    <li><a href=\"http://markmhendrickson.yelp.com/\">Yelp</a></li>\n  </ul>\n</div>\n\n<div id=\"posts\">\n  <h1>Posts I've written</h1>\n  <ul>\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "post", "in", "model", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </ul>\n</div>\n\n<div style=\"clear: both;\"></div>");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["post"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"post-body\">\n  ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.markdown || depth0.markdown),stack1 ? stack1.call(depth0, "model.body", options) : helperMissing.call(depth0, "markdown", "model.body", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  <div style=\"clear: both;\"></div>\n</div>");
  return buffer;
  
});