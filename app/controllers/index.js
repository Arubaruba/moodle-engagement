App.IndexController = Ember.Controller.extend({
  actions: {
    logout: function () {
      localStorage.moodleToken = '';
      App.set('moodleToken', '');
      this.transitionTo('login');
    }
  },
  init: function () {
    this.store.findAll('class').then(function(data) {
      console.log(data.length);
    });
    this.set('classes', this.store.findAll('class'));
  }
});