angular.module('app.controllers')

.controller("newMarkingCtrl", function ($ionicHistory, currentUserService, $state, $scope, $rootScope, $http, factoryMarking, $ionicPopup, $cordovaGeolocation) {
  $rootScope.markings = [];

  var options = {enableHighAccuracy: true};

  $http.get(URL + '/markings')

    .success(function(content){
      angular.forEach(content, function(value, key) {
        $rootScope.markings.push(value);
      })
    }).error(function(data){
      console.log(data)
    })

  $scope.registerMarking = function (marking) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      // $scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      marking.latitude = pos.coords.latitude;
      marking.longitude = pos.coords.longitude;
    })

      factoryMarking.save(marking, function (result){
        $rootScope.markings.push({
          name: marking.name,
          fire: marking.fire,
          water: marking.water,
          earth: marking.earth,
          air: marking.air,
          description: marking.description,
          latitude: marking.latitude,
          longitude: marking.longitude
        });
      var alertPopup = $ionicPopup.alert({
        title: 'Incidente cadastrado com sucesso',
        template: 'Obrigado por contribuir!'
      })
      console.log("Success!")
      $ionicHistory.nextViewOptions({
        disableBack: true
      })
      console.log(marking)
      /* This state must be reset and the back button too */
      }, function (error) {
        var alertPopup = $ionicPopup.alert({
        title: 'Informações insuficientes',
        template: 'Preencha as informações corretamente!'
        })
      })
    }

})
