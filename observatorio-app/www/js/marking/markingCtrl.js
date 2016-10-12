angular.module('app.controllers')

.controller('markingCtrl', function($scope, $state, $stateParams, factoryMarking, $http){
  $http.get('http://localhost:3000/markings')
  .success(function(markings){
    $scope.markings = markings;
  }).error(function(data){
    console.log(data) 
  })

  $scope.registerMarking= function(marking){
    console.log(marking);
    factoryMarking.save(marking, function(result){
      console.log(result);
      $state.go("menu.home")
    })
  }
})
