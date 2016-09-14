// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngResource','app.controllers'])

.constant('URL', 'http://localhost:3000')
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  })
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state('menu.home', {
  url: '/home',
  views: {
    'side-menu': {
      templateUrl: 'templates/home.html',
      controller: 'homeCtrl'
    }
  }
  })

  .state('menu', {
  url: '/side-menu',
  templateUrl: 'templates/menu.html',
  controller: 'menuCtrl'
  })

  .state('signin', {
  url: '/signin',
  templateUrl: 'templates/signin.html',
  controller: 'signinCtrl'
  })

  .state('signup', {
  url: '/signup',
  templateUrl: 'templates/signup.html',
  controller: 'signupCtrl'
  })

  $urlRouterProvider.otherwise('/signin')

  //$urlRouterProvider.otherwise("app/home");
})
