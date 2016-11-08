angular.module("app.controllers")

.controller("editMarkingCtrl", function($scope, $state, currentMarkingService, factoryEditMarking){
  $scope.$on("$ionicView.enter", function(event, data){
    $scope.marking = currentMarkingService.getMarking();
    console.log($scope.marking);
  });

  $scope.confirmEditMarking = function(marking){
    console.log(marking);
    factoryEditMarking.save(marking, function(result){
      console.log("salvou... olhar o terminal do rails...");
      $state.go('tabs.map');
    }, function(erro){
      console.log(error);
    })
  };

})
