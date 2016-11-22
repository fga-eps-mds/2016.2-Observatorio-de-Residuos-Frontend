angular.module('starter')

.controller('signOutCtrl', function($scope, $state, currentUserService) {

  $scope.signOut = function() {
    facebookConnectPlugin.logout(function(success){
      console.log("logged out");
    }, function(error){
      console.log('an error has ocurred');
    });
    currentUserService.setUserData(null);
    currentUserService.setUserMarking([]);
    currentUserService.setUserPevs([]);
    $state.go('signin');
  };
});
