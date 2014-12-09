App.IndexRoute = Ember.Route.extend({
  model: function () {
    var controller = this.controllerFor('index');
    return this.store.find('student', {
      course: controller.get('selectedCourse.id')
    });
  },
  setupController: function(controller, model) {
    controller.set('courses', this.store.find('course'));
  }
});
