angular.module('app.controllers')

.controller('signinCtrl', function ($scope, $stateParams, $state, socialService, factoryEmail, factoryLogin, $ionicLoading, $timeout) {
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
          console.log(authData)
          $scope.user = authData;
          factoryEmail.save({"email": ((socialNetwork=='facebook')?authData.facebook.email:authData.google.email)}, function(result) {
            if(result.userExist){
              $state.go('menu.home')
            }else{
              if(socialNetwork=='facebook'){
                $scope.user.first_name = authData.facebook.cachedUserProfile.first_name;
                $scope.user.last_name = authData.facebook.cachedUserProfile.last_name;
                $scope.user.gender = authData.facebook.cachedUserProfile.gender;
                $scope.user.profile_type = "cidadao";
                $scope.user.email = authData.facebook.email;
              }else{
                $scope.user.first_name = authData.google.cachedUserProfile.given_name;
                console.log("nome:"+ $scope.user.first_name)
                $scope.user.last_name  = authData.google.cachedUserProfile.family_name;
                console.log("lastNome:"+ $scope.user.last_name)
                $scope.user.gender = authData.google.cachedUserProfile.gender;
                $scope.user.profile_type = "cidadao";
                $scope.user.email = authData.google.email;
              }
              socialService.setUserData($scope.user)
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
