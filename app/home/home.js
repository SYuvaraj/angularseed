'use strict';
 
angular.module('myApp.home', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])
 
// Home controller
.controller('HomeCtrl', ['$scope', '$location', 'CommonProp','$firebaseAuth',function($scope, $location ,CommonProp, $firebaseAuth) {
 	var firebaseObj = new Firebase("https://angulrseed.firebaseIO.com"); 
 	var loginObj = $firebaseAuth(firebaseObj);
 	$scope.SignIn = function(e) {
 		e.preventDefault();
 		
 		var username = $scope.user.email;
 		var password = $scope.user.password;
 		loginObj.$authWithPassword({
 			email: username,
 			password: password
 		})
 		.then(function(user){
 			//success callback
 			console.log('Auth success');
 			$location.path('/welcome');
 			login.loading = true;
 			CommonProp.setUser(user.password.email);
 		}, function(error){
 			login.loading = false;
 			console.log('Auth fail');
 		});

 	}
 	var login = {};
	$scope.login = login;
 	

}])

.service('CommonProp', function(){
	var user;
	return{
		getUser: function(){
			return user;
		},
		setUser: function(value){
			user = value;
		}
	};
})
.directive('laddaLoading', [
    function() {
        return {
            link: function(scope, element, attrs) {
                var Ladda = window.Ladda;
                var ladda = Ladda.create(element[0]);
                // Watching login.loading for change
                scope.$watch(attrs.laddaLoading, function(newVal, oldVal) {
                    // Based on the value start and stop the indicator
                    if (newVal) {
                        ladda.start();
                    } else {
                        ladda.stop();
                    }
                });
            }
        };
    }
]);