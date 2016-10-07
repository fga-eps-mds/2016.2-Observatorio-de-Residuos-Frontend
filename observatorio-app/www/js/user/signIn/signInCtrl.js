angular.module('app.controllers')

.controller('signinCtrl', function ($scope, $stateParams, $state, firebaseService, currentUserService, factoryEmail, factoryLogin, $ionicLoading, $timeout) {
  $scope.loginAttempt = function(user){
      console.log(user);
      factoryLogin.save(user, function(result){
        console.log(result);
        $state.go("menu.home")
        $scope.loginError = false;
      }, function(error){
        console.log("ERRO!")
        $scope.loginError = true;
      })
    }

  $scope.registerSocial = function(socialNetwork){
      $scope.user = firebaseService.socialLogin(socialNetwork)
      console.log("ROLA")
      if($scope.user!= null){
        console.log("ROLA2")
          factoryEmail.save({"email": $scope.user.email}, function(result) {
            currentUserService.setUserData($scope.user)
            console.log("ROLA3")
            if(result.userExist){
              console.log("ROLA4")
              $state.go('menu.home')
            }else{
              console.log("ROLA5")
              $state.go('signup')
            }
          }, function(error){
            console.log(error)
          })
          $ionicLoading.show({
          template: 'Recebendo suas informações... <ion-spinner icon="android"></ion-spinner>'
          });
          $timeout(function(){
            $ionicLoading.hide();
          },10000);
      }
  }
})
