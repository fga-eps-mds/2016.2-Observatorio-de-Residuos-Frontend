angular.module('starter', ['ionic', 'ngResource','app.controllers', 'ngMap'])

.constant('URL', 'http://localhost:3000')
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
})
