angular.module('starter')

.controller('signOutCtrl', function($scope, $state, currentUserService) {

  $scope.signOut = function() {
    currentUserService.setUserData(null);
    $state.go('signin');
  };
});
