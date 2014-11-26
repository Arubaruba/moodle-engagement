var App = Ember.Application.create();

var MoodleURL = 'http://localhost/moodle';

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'data'
});

App.Router.map(function() {
  this.route('login');

});
