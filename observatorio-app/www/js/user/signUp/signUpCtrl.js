angular.module('app.controllers')

.controller('signupCtrl', function ($scope, factoryRegister,socialService, $state) {

  $scope.user = socialService.getUserData()
  $scope.registerEmail= function(user){
      console.log(user);
      factoryRegister.save(user, function(result){
        console.log(result);
        $scope.invalidEmail = false;
        $state.go("menu.home")
      }, function(error){
        $scope.invalidEmail = true;
      })
  }
})
