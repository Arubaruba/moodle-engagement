App.LoginController = Ember.Controller.extend({
  actions: {
    login: function() {
      var controller = this;
      $.get('/login', {username: 'teacher0', password: 'Moodle123!'}, function(data) {
        localStorage.moodleToken = data;
        App.set('moodleToken', data);
        controller.transitionTo('index');
      });
    }
  }
});
