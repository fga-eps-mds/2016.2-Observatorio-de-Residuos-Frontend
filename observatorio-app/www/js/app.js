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

  .state('menu.my-markings', {
    url: '/my-markings',
    views: {
      'side-menu': {
        templateUrl: 'templates/my-markings.html',
        controller: 'my-markingsCtrl'
      }
    }
  })

  .state('menu.nearby', {
    url: '/nearby',
    views: {
      'side-menu': {
        templateUrl: 'templates/nearby.html',
        controller: 'nearbyCtrl'
      }
    }
  })

  .state('menu.new-marking', {
    url: '/new-marking',
    views: {
      'side-menu': {
        templateUrl: 'templates/new-marking.html',
        controller: 'new-markingCtrl'
      }
    }
  })

  .state('menu.profile', {
    url: '/profile',
    views: {
      'side-menu': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
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
})
