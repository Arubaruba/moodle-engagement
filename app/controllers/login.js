App.LoginController = Ember.Controller.extend({
  actions: {
    login: function() {
      $.get('/login', {username: 'admin', password: 'Moodle123!'}, function(data) {
        var cookies = data[1][0];
        // match string between '=' and ';' in:
        // MoodleSession=ouhkac4g31fri263blvmhudh46; path=/moodle/
        // and take the first group
        localStorage.moodleToken = cookies.match(/=(\w+);/)[1];
      });
    }
  }
});
