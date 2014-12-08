App.IndexController = Ember.Controller.extend({
  selectedCourse: null,
  actions: {
    logout: function () {
      localStorage.moodleToken = '';
      App.set('moodleToken', '');
      App.reset();
    }
  }
});