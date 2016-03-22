'use strict';
 
angular.module('myApp.register', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/register.html',
        controller: 'RegisterCtrl'
    });
}])
 
// Register controller
.controller('RegisterCtrl', [ '$scope', '$location', '$firebaseAuth', function($scope, $location, $firebaseAuth) {
	var firebaseObj = new Firebase("https://angulrseed.firebaseIO.com");
	var auth = $firebaseAuth(firebaseObj);
	 $scope.signUp = function(){
	 	if ( !$scope.regForm.$invalid ){
	 		console.log("Valid forms submission");
	 		var email = $scope.user.email;
	 		var password = $scope.user.password;
	 		if ( email && password ){
	 			auth.$createUser(email, password)
	 				.then(function(){
	 					$location.path('/home');
	 					console.log('user creation success');
	 				}, function(error){
						console.log('user creation fail');
						$scope.regError = true;
						$scope.regErrorMessage = error.message;
	 				});
	 		}
	 	}
	 };

}]);