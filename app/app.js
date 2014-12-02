var App = Ember.Application.create();

var MoodleURL = 'http://localhost/moodle';

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'data',
  headers: function() {
    return {
      moodle_token: this.get('App.moodleToken') || localStorage.moodleToken
    };
  }.property('App.moodleToken')
});

App.Router.map(function() {
  this.route('login');
});
