angular.module('app.controllers')

.controller("newMarkingCtrl", function ($ionicHistory, currentUserService, NgMap, $state, $scope, $rootScope, factoryMarking, $ionicPopup, URL, $http, $ionicLoading) {

  var options = {enableHighAccuracy: true};
  if(angular.isUndefined($rootScope.markings)){
    $rootScope.markings = [];
  }

  $ionicLoading.show({
    template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
  });
  $rootScope.marking_types = [];
  $http.get(URL + '/marking_types')
  .success(function(content){
    $ionicLoading.hide();
    angular.forEach(content, function(value, key) {
      $rootScope.marking_types.push(value);
    })
  })
  .error(function(error){
    $ionicLoading.hide();
    console.log("Error");
  })

  //Function to register new marking
  $scope.registerMarking = function (marking) {
    NgMap.getGeoLocation().then(function(map) {
      marking.latitude = map.lat();
      marking.longitude = map.lng();
      marking.author_email = currentUserService.getUserData().email;
      marking.total_confirmacoes_existencia = 0;
      marking.total_confirmacoes_resolvido = 0;
      $ionicLoading.show({
        template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
      });
      factoryMarking.save(marking, function (result){
        result.author_email = marking.author_email;
        $rootScope.markings.push(result);
      var alertPopup = $ionicPopup.alert({
        title: 'Incidente cadastrado com sucesso',
        template: 'Obrigado por contribuir!'
      })
      console.log("Success!")
      $ionicLoading.hide();
      $ionicHistory.nextViewOptions({
        disableBack: true
      })
      $state.go('tabs.map')
      /* This state must be reset and the back button too */
      }, function (error) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Informações insuficientes',
          template: 'Preencha as informações corretamente!'
        })
      });
  },function(error) {
    $ionicLoading.hide();
    alert('Unable to get location: ' + error.message);
  }, options);
}
});
