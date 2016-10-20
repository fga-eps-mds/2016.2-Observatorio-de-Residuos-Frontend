angular.module('app.controllers', [])
/*Arquivo de definição do modulo App.controllers
e onde podem ser adicionadas controllers relacionadas a aplicação */

//Constante URL da aplicação utilizada nas Factories.
.constant('URL', 'http://localhost:3000')

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