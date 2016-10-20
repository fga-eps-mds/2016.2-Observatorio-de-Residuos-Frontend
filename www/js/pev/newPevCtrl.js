angular.module('app.controllers')

  .controller("newPevCtrl", function ($ionicHistory, $scope, $rootScope, $http, factoryPEV, $ionicPopup, $cordovaGeolocation, URL) {
    $rootScope.pevs = [];

    $http.get(URL + '/pevs')

    .success(function(content){
      angular.forEach(content, function(value, key) {
      $rootScope.pevs.push(value);
    })
    }).error(function(data){
      console.log(data)
    })

    $scope.createPEV = function (pev) {
      factoryPEV.save(pev, function (result){
        $rootScope.pevs.push({
          name: pev.name,
          paper: pev.paper,
          plastic: pev.plastic,
          metal: pev.metal,
          glass: pev.glass,
          comment: pev.comment,
          latitude: pev.latitude,
          longitude: pev.longitude
        });
        var alertPopup = $ionicPopup.alert({
          title: 'PEV cadastrada com sucesso',
          template: 'Obrigado por contribuir!'
        })
        $scope.pev={}
        console.log("Success!")
        $ionicHistory.nextViewOptions({
          disableBack: true
        })

        console.log(pev)
        /* This state must be reset and the back button too */
      }, function (error) {
        var alertPopup = $ionicPopup.alert({
          title: 'Informações insuficientes',
          template: 'Preencha as informções corretamente!'
        })
      })
    }

})
