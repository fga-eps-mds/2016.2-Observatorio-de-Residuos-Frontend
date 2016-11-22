angular.module('app.controllers')

.controller("newMarkingCtrl", function ($ionicHistory, currentUserService, NgMap, $state, $scope, $rootScope, factoryMarking, $ionicPopup, URL, $http) {

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
  })
  .error(function(error){
    console.log("Error");
  })

  //Function to register new marking
  $scope.registerMarking = function (marking) {
    NgMap.getGeoLocation().then(function(map) {
      marking.latitude = map.lat();
      marking.longitude = map.lng();
      marking.author_email = currentUserService.getUserData().email;
      marking.full_name = currentUserService.getUserData().nome_completo;
      marking.likes = 0;
      marking.dislikes = 0;
      console.log(marking)
      factoryMarking.save(marking, function (result){
        $rootScope.markings.push(result);
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
