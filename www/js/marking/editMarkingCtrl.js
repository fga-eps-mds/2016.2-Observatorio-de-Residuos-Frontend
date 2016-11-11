angular.module("app.controllers")

.controller("editMarkingCtrl", function($scope, $state, currentMarkingService, factoryEditMarking){
  //Função que atualiza as variáveis de escopo
  $scope.$on("$ionicView.enter", function(event, data){
    $scope.marking = currentMarkingService.getMarking();
    console.log($scope.marking);
  });

  //Função que manda as mudanças para o Backend
  $scope.confirmEditMarking = function(marking){
    console.log(marking);
    factoryEditMarking.save(marking, function(result){
      $state.go('tabs.map');
    }, function(erro){
      console.log(error);
    })
  };

})
