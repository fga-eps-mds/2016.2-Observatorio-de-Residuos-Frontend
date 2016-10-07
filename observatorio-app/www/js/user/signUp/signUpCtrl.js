angular.module('app.controllers')

.controller('signupCtrl', function ($scope, factoryRegister, currentUserService, $state) {

  $scope.user = currentUserService.getUserData()
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
