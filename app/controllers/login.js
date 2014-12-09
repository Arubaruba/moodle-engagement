App.LoginController = Ember.Controller.extend({
  actions: {
    login: function () {
      var controller = this;
      controller.set('loginError', '');
      $.get('/login', {username: this.get('username'), password: this.get('password')}, function (data) {
        localStorage.moodleToken = data;
        App.set('moodleToken', data);
        controller.transitionTo('index');
      }).fail(function () {
        controller.set('loginError', 'Invalid Credentials');
      });
    }
  }
});
