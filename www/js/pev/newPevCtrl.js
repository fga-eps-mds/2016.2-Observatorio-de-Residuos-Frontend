angular.module('app.controllers')

.controller("newPevCtrl", function ($ionicHistory, NgMap,$state, $scope, $rootScope,currentUserService, factoryPEV, $ionicPopup, URL) {
  var options = {enableHighAccuracy: true};
  if(angular.isUndefined($rootScope.pevs)) {
    $rootScope.pevs = [];
  }

    //Function that create scope variable and register new PEV
    $scope.createPEV = function (pev) {
      NgMap.getGeoLocation().then(function(map) {
        pev.latitude = map.lat();
        pev.longitude = map.lng();
        pev.author_email = currentUserService.getUserData().email;
        pev.likes = 0;
        pev.dislikes = 0;
        factoryPEV.save(pev, function (result){
          console.log(result)
          $rootScope.pevs.push({
            author_email: pev.author_email,
            id_pev: result.id_pev,
            titulo_pev: result.titulo_pev,
            descricao_pev: result.descricao_pev,
            latitude: result.latitude,
            longitude: result.longitude,
            metal: result.metal,
            paper: result.paper,
            plastic: result.plastic,
            glass: result.glass,
            likes: pev.likes,
            dislikes: pev.dislikes
          });
          var alertPopup = $ionicPopup.alert({
            title: 'PEV cadastrada com sucesso',
            template: 'Obrigado por contribuir!'
          });
          $scope.pev={}
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
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
  })
