angular.module('app.controllers')

.controller('signinCtrl', function ($scope,   factoryLogin, $ionicLoading, $timeout, loginService) {

  $scope.secret = {};
  $scope.options = {};
  $scope.user = {};

  var rememberedUser = window.localStorage.getItem('rememberedUser');

  if(rememberedUser) {
    rememberedUser = JSON.parse(rememberedUser);

    $scope.user.email = rememberedUser.email;
    $scope.secret.password = rememberedUser.password;
    $scope.options.rememberMe = true;
  }


  $scope.loginAttempt = function(user) {

    if($scope.options.rememberMe) {
      var userToRemember = {email: user.email, password: $scope.secret.password};
      window.localStorage.setItem('rememberedUser', JSON.stringify(userToRemember));
    } else {
      window.localStorage.removeItem('rememberedUser');
    }

    loginService.login(user, $scope.secret.password, $scope.options.autoLogin).then(function(success) {

    }, function(error){
      $scope.loginError = true;
    })
  };
});
