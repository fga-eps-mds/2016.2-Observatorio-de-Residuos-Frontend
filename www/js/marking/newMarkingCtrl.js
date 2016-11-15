angular.module('app.controllers')

.controller("newMarkingCtrl", function ($ionicHistory, URL, $http, currentUserService, NgMap, $state, $scope, $rootScope, factoryMarking, $ionicPopup, URL) {
  //Function that create scope variable
  var options = {enableHighAccuracy: true};
  if(angular.isUndefined($rootScope.markings)) {
    $rootScope.markings = [];
  }

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

  //Function to register new marking
  $scope.registerMarking = function (marking) {
    NgMap.getGeoLocation().then(function(map) {
      console.log(currentUserService.getUserData());
      marking.latitude = map.lat();
      marking.longitude = map.lng();
      marking.author_email = currentUserService.getUserData().email;
      marking.full_name = currentUserService.getUserData().nome_completo;
      factoryMarking.save(marking, function (result){
        console.log(marking);
        $rootScope.markings.push({
          author_email: marking.author_email,
          name: marking.name,
          description: marking.description,
          latitude: marking.latitude,
          id_marking_type: marking.id_marking_type,
          longitude: marking.longitude,
          author_name: marking.full_name
        });
      var alertPopup = $ionicPopup.alert({
        title: 'Incidente cadastrado com sucesso',
        template: 'Obrigado por contribuir!'
      })
      console.log("Success!")
      $ionicHistory.nextViewOptions({
        disableBack: true
      })
      $state.go('tabs.map')
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
