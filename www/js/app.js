angular.module('starter', ['ionic', 'ngResource','app.controllers', 'ngMap', 'ngCordova'])

.run(function($ionicPlatform, currentUserService, $state, loginService,
              $rootScope, $ionicHistory) {

  $ionicPlatform.registerBackButtonAction(function(e) {
    if ($rootScope.backButtonPressedToExit) {
      ionic.Platform.exitApp();
    } else if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    } else {
      $rootScope.backButtonPressedToExit = true;
      window.plugins.toast.showShortBottom("Pressione novamente para sair");
      setTimeout(function(){
        $rootScope.backButtonPressedToExit = false;
      }, 2000);
    }
    e.preventDefault();

    return false;
  }, 101);

  $ionicPlatform.ready(function() {
    var user = window.localStorage.getItem('autoLoginUser');

    if (user) {
      user = JSON.parse(user);
      loginService.login({email: user.email}, user.password, true).then(function(success) {
      }, function(error) {
        $state.go('signin');  
      })
    } else {
      $state.go('signin');
    }
  })
})
