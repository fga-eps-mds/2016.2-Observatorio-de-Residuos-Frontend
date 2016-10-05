angular.module('app.controllers')

.controller('markingCtrl', function($scope, $state, $stateParams, factoryMarking){
  $scope.registerMarking= function(marking){
    console.log(marking);
    factoryMarking.save(marking, function(result){
      console.log(result);
      $state.go("menu.home")
    })
  }
})
