angular.module('starter')

.controller('signOutCtrl', function($scope, $state, currentUserService) {

  $scope.signOut = function() {
    currentUserService.setUserData(null);
    currentUserService.setUserMarking([]);
    currentUserService.setUserPevs([]);
    $state.go('signin');
  };
});
