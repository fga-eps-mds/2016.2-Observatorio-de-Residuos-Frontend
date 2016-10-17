angular.module('app.controllers', [])
/*Arquivo de definição do modulo App.controllers
e onde podem ser adicionadas controllers relacionadas a aplicação */

.controller('popoverCtrl', function($scope, $ionicPopover) {

  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
});