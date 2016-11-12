angular.module('app.controllers')

.controller('popoverProfileCtrl', function($scope, $ionicPopover) {

  //Function that create popover profile
  $ionicPopover.fromTemplateUrl('views/popoverProfile.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  //Function that close popover profile
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
});