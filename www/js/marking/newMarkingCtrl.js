angular.module('app.controllers')

.controller("newMarkingCtrl", function ($ionicHistory, currentUserService, $state, $scope, $rootScope, factoryMarking, $ionicPopup, URL, $cordovaGeolocation) {

  var options = {enableHighAccuracy: true};

  $scope.registerMarking = function (marking) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      // $scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      marking.latitude = pos.coords.latitude;
      marking.longitude = pos.coords.longitude;
      console.log(marking);
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
      });
  },function(error) {
    alert('Unable to get location: ' + error.message);
  }, options);
}
});
