App.IndexController = Ember.Controller.extend({
  actions: {
    logout: function() {
      localStorage.moodleToken = '';
      App.set('moodleToken', '');
      this.transitionTo('login');
    }
  }
});