App.Student = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  lastLogin: DS.attr('date'),
  email: DS.attr('string')
});