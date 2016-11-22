angular.module('app.controllers')

//Controller responsible for markings in to contribuindo
.controller('markingsCtrl', function($scope, $http, URL, $rootScope, currentUserService, markingService, $state) {
  $rootScope.markings = [];
  $rootScope.marking_types = [];
  $scope.currentUserEmail = currentUserService.getUserData().email;


  $http.get(URL + '/marking_types')
  .success(function(content){
    angular.forEach(content, function(value, key) {
      $rootScope.marking_types.push(value);
    })
    $http.get(URL + '/markings')
    .success(function(content){
      angular.forEach(content, function(value, key) {
        angular.forEach($scope.marking_types, function (otherValue) {
          if (otherValue.id_tipo_incidente == value.id_tipo_incidente){
            value.tipo_incidente = otherValue.tipo_incidente;
          }
        })
        $rootScope.markings.push(value);
      })
    })
    .error(function(error){
      console.log("Error");
    })
  })
  .error(function(error){
    console.log("Error");
  })

  $scope.openMarking = function (marking) {
    markingService.setMarking(marking);
    $state.go("tabs.markings.detailMarking");
  }


})
