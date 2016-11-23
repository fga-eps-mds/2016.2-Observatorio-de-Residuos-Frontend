angular.module('starter')

.controller('signOutCtrl', function($scope, $state, currentUserService, 
  $ionicHistory) {

  $scope.signOut = function() {
    $ionicHistory.clearCache().then(function() {
      $ionicHistory.clearHistory();
      $ionicHistory.nextViewOptions({disableBack:true, historyRoot: true});
      currentUserService.setUserData(null);
      currentUserService.setUserMarking([]);
      currentUserService.setUserPevs([]);
      $state.go('signin');
    });
  };
});
