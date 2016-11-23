angular.module("app.controllers")

.controller("editMarkingCtrl", function($scope, $rootScope, $http, URL, $state /*, $ionicModal*/ , currentMarkingService, factoryEditMarking) {
 //Function that update scope variables
 $rootScope.marking_types = [];
 $http.get(URL + '/marking_types')
  .success(function(content) {
   angular.forEach(content, function(value, key) {
    $rootScope.marking_types.push(value);
   })
  })
  .error(function(error) {
   console.log("Error");
  })

 //Function that send changes to backend
 $scope.confirmEditMarking = function(marking, modalEditMarking) {
  factoryEditMarking.save(marking, function(result) {
   modalEditMarking.hide();
  }, function(error) {
   console.log(error);
  })
 };
})
