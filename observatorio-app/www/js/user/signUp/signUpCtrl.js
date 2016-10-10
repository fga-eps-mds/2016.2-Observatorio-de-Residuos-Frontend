angular.module('app.controllers')

.controller('signupCtrl', function ($scope, factoryRegister, currentUserService, $state) {
  $scope.user = currentUserService.getUserData()
  $scope.registerEmail= function(user){
      user.password_digest = String(CryptoJS.SHA256(user.password_digest));//criptografia
      user.password_confirmation = String(CryptoJS.SHA256(user.password_confirmation));
      factoryRegister.save(user, function(result){
        console.log(result);
        $scope.invalidEmail = false;
        $state.go("menu.home")
      }, function(error){
        $scope.invalidEmail = true;
      })
  }
})
