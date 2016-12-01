angular.module('starter', ['ionic', 'ngResource','app.controllers', 'ngMap', 'ngCordova'])

.run(function($ionicPlatform, currentUserService, $state, loginService) {

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
