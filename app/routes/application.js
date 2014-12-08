App.ApplicationRoute = Ember.Route.extend({
  events: {
    error: function(error, transition) {
      if (error.responseText == 'not_logged_in') {
        this.transitionTo('login');
      } else {
        console.error(error);
        //transition.retry();
      }
    }
  }
});
