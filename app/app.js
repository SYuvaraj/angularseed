'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'myApp.home',
	'myApp.register',
	'myApp.welcome',
	'myApp.addPost'

]).
config(['$routeProvider', function($routeProvider){
	//Routes will be here
	$routeProvider.otherwise('/home',{
		redirectTo: '/home'
	});

}]);
