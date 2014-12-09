App.IndexController = Ember.Controller.extend({
  selectedCourse: {name: 'All'},
  actions: {
    logout: function () {
      localStorage.moodleToken = '';
      App.set('moodleToken', '');
      App.reset();
    }
  }
});