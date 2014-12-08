App.IndexRoute = Ember.Route.extend({
  model: function () {
    var controller = this.controllerFor('index');
    return this.store.findAll('student', {
    });
  },
  setupController: function(controller, model) {
    controller.set('courses', this.store.find('course'));
  }
});
