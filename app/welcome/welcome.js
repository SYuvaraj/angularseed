'use strict';

angular.module('myApp.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/welcome', {
		templateUrl: 'welcome/welcome.html',
		controller: 'welcomeCtrl'
	});
}])
.controller('welcomeCtrl', ['$scope','CommonProp', '$firebase','$location', function($scope, CommonProp, $firebase, $location){
	$scope.username = CommonProp.getUser();

	if(!$scope.username){
        $location.path('/home');
    }

	var firebaseObj = new Firebase("https://angulrseed.firebaseIO.com/Articles");
	var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));

	$scope.articles = sync.$asArray();
	 
	$scope.logout = function(){
		CommonProp.logoutUser();
	}

	$scope.editPost = function(id) {
		var firebaseObj = new Firebase("https://angulrseed.firebaseIO.com/Articles/" + id);
		var syn = $firebase(firebaseObj);
		$scope.postToUpdate = syn.$asObject();
		$('#editModal').modal();      // triggers the modal pop up
	}

	$scope.update = function() {
	    var fb = new Firebase("https://angulrseed.firebaseIO.com/Articles/"+$scope.postToUpdate.$id);
	    var article = $firebase(fb);
	    article.$update({
	        title: $scope.postToUpdate.title,
	        post: $scope.postToUpdate.post,
	        emailId: $scope.postToUpdate.emailId
	    }).then(function(ref) {
	        $('#editModal').modal('hide');
	    }, function(error) {
	        console.log("Error:", error);
	    });
	}

	$scope.confirmDelete = function(id) {
        var fb = new Firebase("https://angulrseed.firebaseIO.com/Articles/"  + id);
        var article = $firebase(fb);
        $scope.postToDelete = article.$asObject();
        $('#deleteModal').modal();
    }
    $scope.deletePost = function() {
        var fb = new Firebase("https://angulrseed.firebaseIO.com/Articles/" + $scope.postToDelete.$id);
        var article = $firebase(fb);
        article.$remove().then(function(ref) {
            $('#deleteModal').modal('hide');
        }, function(error) {
            console.log("Error:", error);
        });
    }
    


}]);