var App = Ember.Application.create();

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'data'
});

App.Router.map(function() {
  // TODO
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('student');
  }
});
