angular.module('app.controllers')

//Controller responsible for markings in to contribuindo
.controller('markingsCtrl', function($scope, $http, URL, $rootScope, currentUserService, markingService, $state, $ionicLoading) {
  $rootScope.markings = [];
  $rootScope.marking_types = [];
  $scope.currentUserEmail = currentUserService.getUserData().email;

  $ionicLoading.show({
    template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
  });
  $http.get(URL + '/marking_types')
  .success(function(content){
    $ionicLoading.hide();
    angular.forEach(content, function(value, key) {
      $rootScope.marking_types.push(value);
    })
    $http.get(URL + '/markings')
    .success(function(content){
      $ionicLoading.hide();
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
      $ionicLoading.hide();
      console.log("Error");
    })
  })
  .error(function(error){
    $ionicLoading.hide();
    console.log("Error");
  })

  $scope.openMarking = function (marking) {
    markingService.setMarking(marking);
    $state.go("tabs.markings.detailMarking");
  }
})
