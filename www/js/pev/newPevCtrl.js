angular.module('app.controllers')

  .controller("newPevCtrl", function ($ionicHistory, $state, $scope, $rootScope, $http, factoryPEV, $ionicPopup, $cordovaGeolocation, URL, currentUserService) {
    $rootScope.pevs = [];
    
    
    var options = {enableHighAccuracy: true};

    $http.get(URL + '/pevs')

    .success(function(content){
      angular.forEach(content, function(value, key) {
        $rootScope.pevs.push(value);
      })
    })
    .error(function(data){
      console.log(data)
    });
    $scope.createPEV = function (pev) {
        console.log(pev)
            navigator.geolocation.getCurrentPosition(function(pos){
                    pev.latitude = pos.coords.latitude;
                    pev.longitude = pos.coords.longitude;
                    pev.author_email = currentUserService.getUserData().email;
                    console.log(pev);
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
