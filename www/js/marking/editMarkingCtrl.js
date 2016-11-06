angular.module("app.controllers")

.controller("editMarkingCtrl", function($scope, $state, currentMarkingService, factoryEditMarking){
  var name = currentMarkingService.getMarking().name;
  var description = currentMarkingService.getMarking().description;

  $scope.marking = {
    name: function(newName) {
      return arguments.length ? (name = newName) : name;
    },
    description: function(newDescription){
      return arguments.length ? (description = newDescription) : description;
    },
    latitude: currentMarkingService.getMarking().latitude,
    longitude: currentMarkingService.getMarking().longitude,
    name: name,
    description: description
  };

  $scope.confirmEditMarking = function(marking){
    currentMarkingService.setMarking(marking);
    console.log(marking);
    factoryEditMarking.save(marking, function(result){
      console.log("salvou... olhar o terminal do rails...");
    }, function(erro){
      console.log(error);
    })
  };

})
