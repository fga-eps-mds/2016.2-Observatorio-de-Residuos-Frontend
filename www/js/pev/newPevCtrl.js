angular.module('app.controllers')

  .controller("newPevCtrl", function ($ionicHistory, NgMap,$state, $scope, $rootScope,currentUserService, factoryPEV, $ionicPopup, URL) {
    var options = {enableHighAccuracy: true};
    if(angular.isUndefined($rootScope.pevs)) {
      $rootScope.pevs = [];
    }

    //Function that create scope variable and register new PEV
    $scope.createPEV = function (pev) {
            console.log(NgMap);
            NgMap.getGeoLocation().then(function(map) {
                    pev.latitude = map.lat();
                    pev.longitude = map.lng();
                    pev.author_email = currentUserService.getUserData().email;
                    factoryPEV.save(pev, function (result){
                            $rootScope.pevs.push({
                              author_email: pev.author_email,
                              name: pev.name,
                              paper: pev.paper,
                              plastic: pev.plastic,
                              metal: pev.metal,
                              glass: pev.glass,
                              description: pev.description,
                              latitude: pev.latitude,
                              longitude: pev.longitude
                            });
                            var alertPopup = $ionicPopup.alert({
                              title: 'PEV cadastrada com sucesso',
                              template: 'Obrigado por contribuir!'
                            });
                            $scope.pev={}
                            console.log("Success!")
                            console.log(pev)
                            $ionicHistory.nextViewOptions({
                              disableBack: true
                            });
                            $state.go('map')
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
