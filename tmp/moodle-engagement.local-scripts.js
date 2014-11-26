var App = Ember.Application.create();

var MoodleURL = 'http://localhost/moodle';

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'data'
});

App.Router.map(function() {
  this.route('login');

});

App.ApplicationController = Ember.Controller.extend({
  infractions: ['Login Frequency', 'Homework', 'Time Active']
});

App.LoginController = Ember.Controller.extend({
  actions: {
    login: function() {
      console.log('login');
      $.get('/login', {username: 'admin', password: 'Moodle123!'}, function(data) {
        console.inspect(data);
      });
    }
  }
});

App.Student = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  lastLogin: DS.attr('date'),
  email: DS.attr('string'),
  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName')
  }.property('firstName', 'lastName')
});
App.IndexRoute= Ember.Route.extend({
  model: function() {
    return this.store.findAll('student');
  }
});

App.LoginRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('login');
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2FwcGxpY2F0aW9uLmpzIiwiY29udHJvbGxlcnMvbG9naW4uanMiLCJtb2RlbHMvc3R1ZGVudC5qcyIsInJvdXRlcy9pbmRleC5qcyIsInJvdXRlcy9sb2dpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibW9vZGxlLWVuZ2FnZW1lbnQubG9jYWwtc2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBBcHAgPSBFbWJlci5BcHBsaWNhdGlvbi5jcmVhdGUoKTtcblxudmFyIE1vb2RsZVVSTCA9ICdodHRwOi8vbG9jYWxob3N0L21vb2RsZSc7XG5cbkFwcC5BcHBsaWNhdGlvbkFkYXB0ZXIgPSBEUy5SRVNUQWRhcHRlci5leHRlbmQoe1xuICBuYW1lc3BhY2U6ICdkYXRhJ1xufSk7XG5cbkFwcC5Sb3V0ZXIubWFwKGZ1bmN0aW9uKCkge1xuICB0aGlzLnJvdXRlKCdsb2dpbicpO1xuXG59KTtcbiIsIkFwcC5BcHBsaWNhdGlvbkNvbnRyb2xsZXIgPSBFbWJlci5Db250cm9sbGVyLmV4dGVuZCh7XG4gIGluZnJhY3Rpb25zOiBbJ0xvZ2luIEZyZXF1ZW5jeScsICdIb21ld29yaycsICdUaW1lIEFjdGl2ZSddXG59KTtcbiIsIkFwcC5Mb2dpbkNvbnRyb2xsZXIgPSBFbWJlci5Db250cm9sbGVyLmV4dGVuZCh7XG4gIGFjdGlvbnM6IHtcbiAgICBsb2dpbjogZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLmxvZygnbG9naW4nKTtcbiAgICAgICQuZ2V0KCcvbG9naW4nLCB7dXNlcm5hbWU6ICdhZG1pbicsIHBhc3N3b3JkOiAnTW9vZGxlMTIzISd9LCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUuaW5zcGVjdChkYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufSk7XG4iLCJBcHAuU3R1ZGVudCA9IERTLk1vZGVsLmV4dGVuZCh7XG4gIGZpcnN0TmFtZTogRFMuYXR0cignc3RyaW5nJyksXG4gIGxhc3ROYW1lOiBEUy5hdHRyKCdzdHJpbmcnKSxcbiAgbGFzdExvZ2luOiBEUy5hdHRyKCdkYXRlJyksXG4gIGVtYWlsOiBEUy5hdHRyKCdzdHJpbmcnKSxcbiAgZnVsbE5hbWU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmdldCgnZmlyc3ROYW1lJykgKyAnICcgKyB0aGlzLmdldCgnbGFzdE5hbWUnKVxuICB9LnByb3BlcnR5KCdmaXJzdE5hbWUnLCAnbGFzdE5hbWUnKVxufSk7IiwiQXBwLkluZGV4Um91dGU9IEVtYmVyLlJvdXRlLmV4dGVuZCh7XG4gIG1vZGVsOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5maW5kQWxsKCdzdHVkZW50Jyk7XG4gIH1cbn0pO1xuIiwiQXBwLkxvZ2luUm91dGUgPSBFbWJlci5Sb3V0ZS5leHRlbmQoe1xuICByZW5kZXJUZW1wbGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZW5kZXIoJ2xvZ2luJyk7XG4gIH1cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==