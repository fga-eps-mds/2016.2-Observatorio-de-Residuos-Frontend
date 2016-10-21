angular.module('app.controllers')

    .controller("newMarkingCtrl", function ($ionicHistory, $scope, $rootScope, $http, factoryMarking, $ionicPopup, $cordovaGeolocation, URL) {
      $rootScope.markings = [];

      $http.get(URL + '/markings')

          .success(function(content){
            angular.forEach(content, function(value, key) {
              $rootScope.markings.push(value);
            })
          }).error(function(data){
        console.log(data)
      })

      $scope.registerMarking = function (marking) {
        factoryMarking.save(marking, function (result){
          $rootScope.markings.push({
            name: marking.name,
            fire: marking.fire,
            water: marking.water,
            earth: marking.earth,
            air: marking.air,
            comment: marking.comment,
            latitude: marking.latitude,
            longitude: marking.longitude
          });
          var alertPopup = $ionicPopup.alert({
            title: 'Incidente cadastrado com sucesso',
            template: 'Obrigado por contribuir!'
          })
          $scope.marking = {}
          console.log("Success!")
          $ionicHistory.nextViewOptions({
            disableBack: true
          })

          console.log(marking)
        }, function (error) {
          var alertPopup = $ionicPopup.alert({
            title: 'Informações insuficientes',
            template: 'Preencha as informções corretamente!'
          })
        })
      }

    })
