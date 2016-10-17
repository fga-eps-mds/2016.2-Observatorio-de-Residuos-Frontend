angular.module('app.controllers', [])
/*Arquivo de definição do modulo App.controllers
e onde podem ser adicionadas controllers relacionadas a aplicação */

.controller('popoverCtrl', function($scope, $ionicPopover) {

  $ionicPopover.fromTemplateUrl('templates/popoverOlho.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.closePopover = function() {
    $scope.popover.hide();
  };
})

.controller('popoverPevCtrl', function($scope, $ionicPopover) {

  $ionicPopover.fromTemplateUrl('templates/popoverPev.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.closePopover = function() {
    $scope.popover.hide();
  };
})

.controller('popoverPerfilCtrl', function($scope, $ionicPopover) {

  $ionicPopover.fromTemplateUrl('templates/popoverPerfil.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.closePopover = function() {
    $scope.popover.hide();
  };
});