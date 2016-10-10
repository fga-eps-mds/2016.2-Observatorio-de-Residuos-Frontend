angular.module('app.controllers')

  .controller("newPevCtrl", function ($scope, $state, factoryPEV) {
    $scope.createPEV = function (pev) {
        console.log(pev)
      factoryPEV.save(pev, function (result){
        console.log("Sucess!")
        $state.go('menu.home')
        /* This state must be reset and the back button too */
        $scope.pev = {}
      }, function (error) {
        console.log("Error - Factory")
      })
    }
  })
