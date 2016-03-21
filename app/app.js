'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'myApp.home',
	'myApp.register'

]).
config(['$routeProvider', function($routeProvider){
	//Routes will be here
	$routeProvider.otherwise('/home',{
		redirectTo: '/home'
	});

}]);
