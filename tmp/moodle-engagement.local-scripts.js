var App=Ember.Application.create();App.ApplicationAdapter=DS.RESTAdapter.extend({namespace:"data"}),App.Router.map(function(){});
App.ApplicationController=Ember.Controller.extend({infractions:["Login Frequency","Homework","Time Active"]});
App.Student=DS.Model.extend({firstName:DS.attr("string"),lastName:DS.attr("string"),lastLogin:DS.attr("date"),email:DS.attr("string"),fullName:function(){return this.get("firstName")+" "+this.get("lastName")}.property("firstName","lastName")});
App.IndexRoute=Ember.Route.extend({model:function(){return this.store.findAll("student")}});