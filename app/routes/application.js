App.ApplicationRoute = Ember.Route.extend({
  events: {
    error: function(error, transition) {
      console.log(JSON.stringify(error))
      if (error.responseText == 'not_logged_in') {
        this.transitionTo('login');
      } else {
        transition.retry();
      }
    }
  }
});
