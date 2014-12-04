App.IndexController = Ember.Controller.extend({
  classes: [{
    id: -1,
    name: 'All'
  }],
  selectedClass: null,
  actions: {
    logout: function () {
      localStorage.moodleToken = '';
      App.set('moodleToken', '');
      App.reset();
    }
  },
  init: function () {
    var controller = this;
    this.store.find('class').then(function(classes) {
      controller.set('classes', classes);
      var allClasses = controller.get('classes').pushObject({
          id: -1,
          name: 'All'
      });
      controller.set('selectedClass', allClasses);
      controller.addObserver('selectedClass', function() {
        controller.store.unloadAll('student');
        var id = controller.get('selectedClass.id');
        if (id == -1) {
          controller.store.find('student');
        } else {
          //TODO make node find the right students
          controller.store.find('student', {'class': id});
        }
      })
    });
  }
});