angular.module('app.controllers')

.controller('popoverProfileCtrl', function($scope, $ionicPopover) {

  $ionicPopover.fromTemplateUrl('views/popoverProfile.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.closePopover = function() {
    $scope.popover.hide();
  };
});