angular.module('app.controllers')

.controller('signinCtrl', function ($scope, $stateParams, $state, currentUserService, userDataExtractorService, factoryEmail, factoryLogin, $ionicLoading, $timeout) {
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
    var ref = new Firebase("dojogrupo04.firebaseio.com");
    ref.authWithOAuthPopup(socialNetwork, function(error, authData){
      if(error){
        console.log("Failed ", error)
      }
      else{
          $scope.user = authData;
          factoryEmail.save({"email": ((socialNetwork=='facebook')?authData.facebook.email:authData.google.email)}, function(result) {
            if(result.userExist){
              $state.go('menu.home')
            }else{
              userDataExtractorService.extract(authData,socialNetwork)
              currentUserService.setUserData(userDataExtractorService.getData())
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
    },{
      scope: "email"
    })
  }
})
