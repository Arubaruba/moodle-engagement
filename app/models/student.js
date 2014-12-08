App.Student = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  daysSinceActive: DS.attr('number'),
  score: DS.attr('number'),
  courses: DS.hasMany('course', {async: true}),

  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName')
  }.property('firstName', 'lastName'),
  neverActive: function() {
    return Number(this.get('lastLogin')) == 0;
  }.property('lastLogin')
});