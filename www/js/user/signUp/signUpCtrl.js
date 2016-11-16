angular.module('app.controllers')
    /* Controller responsible to realize register of users
  registerEmail: Called by the button of signup.html it will receive user data and save them
                 User received here must have been vaidate by the view */
.controller('signupCtrl', function ($scope, $rootScope, $http, URL, factoryRegister, currentUserService, $state, $ionicPopup) {

  /* In case social login button is used without register data of sign up are filled alone through service of actual user */
  $rootScope.profiles = [];

  $http.get(URL + '/profiles')
  .success(function(content){
    angular.forEach(content, function(value, key) {
      $rootScope.profiles.push(value);

    })
    console.log($rootScope.profiles);
  })
  .error(function(error){
    console.log("Error");
  })


  $scope.user = currentUserService.getUserData();
  $scope.registerEmail= function(user){
      user.password_digest = String(CryptoJS.SHA256(user.password));//encryption
      factoryRegister.save(user, function(result){
        $scope.invalidEmail = false;
            var alertPopup = $ionicPopup.alert({
              title: 'Bem-vindo ao Observatório de Resíduos',
              //subTitle: '',
              template: 'O Observatório de Resíduos é um aplicativo que permite que você compartilhe incidentes, locais para depositar seus resíduos e ainda permite que você encontre ou divulgue seu projeto social! Sinta-se em casa!'
            });
        currentUserService.setUserData(result);
        $state.go('tabs.home')
      }, function(error){
        $scope.invalidEmail = true;
      })
  }
})
