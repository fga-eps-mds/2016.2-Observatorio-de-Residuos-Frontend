angular.module('app.controllers')

.controller('signinCtrl', function ($scope, $stateParams, $state,   socialLoginService, firebaseService,   currentUserService, factoryEmail,   
  factoryLogin, $ionicLoading, $timeout,   $ionicPopup, $http, URL, $ionicHistory) {

  $scope.secret = {};
  $scope.options = {};
  $scope.user = {};

  var rememberedUser = window.localStorage.getItem('rememberedUser');

  if(rememberedUser) {
    rememberedUser = JSON.parse(rememberedUser);
    console.log(rememberedUser);

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
    user.encripted_password = String(CryptoJS.SHA256($scope.secret.password));

    $ionicLoading.show({
      template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
    });

    factoryLogin.save(user, function(result) {
      $http.get(URL + "/user/" + result.id_usuario + "/markings")
      .success(function(seenMarkings) {
        $http.get(URL + "/user/" + result.id_usuario + "/pevs")
        .success(function(seenPevs) {
          $ionicLoading.hide();
          currentUserService.setUserData(result);
          currentUserService.setUserMarking(seenMarkings);
          currentUserService.setUserPevs(seenPevs);
          $ionicHistory.nextViewOptions({disableBack:true});
          window.localStorage.setItem("logged", result);
          $state.go('tabs.home');
          $scope.loginError = false;
        })
        .error(function(error) {
          $ionicLoading.hide();
          console.log(error);
        });
      })
      .error(function(error) {
        $ionicLoading.hide();
        console.log(error);
      });

    }, function(error) {
      $ionicLoading.hide();
      if(error.status == 403) {
        $ionicPopup.alert({
          template: 'Esta conta está desativada.',
          title: 'Erro'
        });
      } else {
        $ionicLoading.hide();
        $scope.loginError = true;
      } 
    });
  };

  $scope.registerSocial = function(socialNetwork) {
    firebaseService.socialLogin(socialNetwork);

    $ionicLoading.show({
      template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    },3000);
  };
});
