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
