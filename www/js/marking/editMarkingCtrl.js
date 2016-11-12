angular.module("app.controllers")

.controller("editMarkingCtrl", function($scope, $rootScope, $http, URL, $state, currentMarkingService, factoryEditMarking){
  //Function that update scope variables
  $scope.$on("$ionicView.enter", function(event, data){
    $scope.marking = currentMarkingService.getMarking();
    console.log($scope.marking);
  });

  $rootScope.marking_types = [];
  $http.get(URL + '/marking_types')
  .success(function(content){
    angular.forEach(content, function(value, key) {
      $rootScope.marking_types.push(value);
    })
    console.log($rootScope.marking_types);
  })
  .error(function(error){
    console.log("Error");
  })

  //Function that send changes to backend
  $scope.confirmEditMarking = function(marking){
    console.log(marking);
    factoryEditMarking.save(marking, function(result){
      $state.go('tabs.map');
    }, function(erro){
      console.log(error);
    })
  };

})
