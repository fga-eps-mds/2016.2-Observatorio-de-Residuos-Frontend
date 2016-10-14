angular.module('app.controllers')

  .controller("newPevCtrl", function ($scope, $state, factoryPEV, $ionicPopup) {
    $scope.createPEV = function (pev) {
        console.log(pev)
      factoryPEV.save(pev, function (result){
        var alertPopup = $ionicPopup.alert({
          title: 'PEV cadastrada com sucesso',
          template: 'Obrigado por contribuir!'
        })
        console.log("Sucess!")
        $state.go('menu.home')
        /* This state must be reset and the back button too */
        $scope.pev = {}
      }, function (error) {
        console.log("Error - Factory")
        var alertPopup = $ionicPopup.alert({
          title: 'Informações insuficientes',
          template: 'Preencha as informções corretamente!'
        })
      })
    }
  })
