'use strict';

angular.module('myApp.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/welcome', {
		templateUrl: 'welcome/welcome.html',
		controller: 'welcomeCtrl'
	});
}])
.controller('welcomeCtrl', ['$scope','CommonProp', function($scope, $CommonProp){
	$scope.username = $CommonProp.getUser();
	var firebaseObj = new Firebase("https://blistering-heat-2473.firebaseio.com/Articles");
	var sync = $firebase(firebaseObj);
	$scope.articles = sync.$asArray();
}]);