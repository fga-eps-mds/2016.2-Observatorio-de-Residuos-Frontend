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
//================================================================
  var rad = function(x) {
    return x * Math.PI / 180;
  };

  var getDistance = function(p1lat, p1lng, p2lat, p2lng) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2lat - p1lat);
    var dLong = rad(p2lng - p1lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1lat)) * Math.cos(rad(p2lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  };

})
