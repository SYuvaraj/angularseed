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

    loginObj.$onAuth(function(authData) {
        if(authData){
            CommonProp.setUser(authData.password.email);
            $location.path('/welcome');
        }
     });

     $scope.user = {};
      var login={};

    $scope.test = function(){
        login.loading = true;
    }

    $scope.login=login;

 	$scope.SignIn = function(e) {
        login.loading = true;
 		e.preventDefault();
 		var username = $scope.user.email;
 		var password = $scope.user.password;
 		loginObj.$authWithPassword({
 			email: username,
 			password: password
 		})
 		.then(function(user){
 			//success callback
            login.loading = false;
 			console.log('Auth success');
 			$location.path('/welcome'); 			
 			CommonProp.setUser(user.password.email);
 		}, function(error){
 			login.loading = false;
 			console.log('Auth fail');
 		});

 	}
 // 	var login = {};
	// $scope.login = login;


}])

.service('CommonProp', ['$location', '$firebaseAuth', function($location, $firebaseAuth){
	var user = '';
    var firebaseObj = new Firebase("https://angulrseed.firebaseIO.com"); 
    var loginObj = $firebaseAuth(firebaseObj);
	return{
		getUser: function(){
            if(user == ''){
                user = localStorage.getItem('userEmail');
            }
			return user;
		},
		setUser: function(value){
            localStorage.setItem("userEmail",value);
			user = value;
		},
        logoutUser: function(){
            loginObj.$unauth();
            user = '';
            localStorage.removeItem('userEmail');
             console.log('done logout');
            $location.path('/home');
        }
	};
    
}])
// .directive('laddaLoading', [
//     function() {
//         return {
//             link: function(scope, element, attrs) {
//                 var Ladda = window.Ladda;
//                 var ladda = Ladda.create(element[0]);
//                 //watch login.loading for change
//                 scope.$watch(attrs.laddaloading, function(newVal, oldVal){
//                     //Based on the value start and stop the indicator
//                     if(newVal){
//                         ladda.start();
//                     }
//                     else{
//                         ladda.stop();
//                     }
//                 });
//             }
//         };
//     }
// ]);
