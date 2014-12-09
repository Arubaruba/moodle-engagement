App.IndexController = Ember.Controller.extend({
  selectedCourse: {id: -1, name: 'All'},
  actions: {
    logout: function () {
      localStorage.moodleToken = '';
      App.set('moodleToken', '');
      App.reset();
    }
  }
});