'use strict';

angular.module('myApp.addPost', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addPost', {
        templateUrl: 'addPost/addPost.html',
        controller: 'AddPostCtrl'
    });
}])
.controller('AddPostCtrl', ['$scope','$firebase','CommonProp','$location',function($scope,$firebase,CommonProp, $location) {


	$scope.AddPost = function() {
		
		if(!CommonProp.getUser()){
		    $location.path('/home');
		}
	    var title = $scope.article.title;
	    var post = $scope.article.post;
 
	    var firebaseObj = new Firebase("https://angulrseed.firebaseIO.com/Articles"); 
		var fb = $firebase(firebaseObj);
     	var user = CommonProp.getUser();
	    
	    // fb.$push({
	    //     title: title,
	    //     post: post,
	    //     emailId: CommonProp.getUser()
	    // }).then(function(ref) {
	    //     console.log(ref);
	    //     $location.path('/welcome');
	    // }, function(error) {
	    //     console.log("Error:", error);
	    // });
		fb.$push({
		    title: title,
		    post: post,
		    emailId: user,
		    '.priority': user
		}).then(function(ref) {
		    console.log(ref);
		    $location.path('/welcome');
		}, function(error) {
		    console.log("Error:", error);
		});
	}
	$scope.logout = function(){
		CommonProp.logoutUser();
	}
}]);