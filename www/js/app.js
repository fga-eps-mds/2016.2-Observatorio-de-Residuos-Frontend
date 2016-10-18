angular.module('starter', ['ionic', 'ngResource','app.controllers', 'ngMap', 'ngCordova'])

//Constante URL da aplicação utilizada nas Factories.
.constant('URL', 'http://localhost:3000')
//Configuração inicial e inicialização do ionic.
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
