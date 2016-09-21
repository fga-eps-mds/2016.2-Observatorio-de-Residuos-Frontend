angular.module('starter')

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state('menu.home', {
  url: '/home',
  views: {
    'side-menu': {
      templateUrl: 'templates/home.html'
    }
  }
  })

  .state('menu', {
  url: '/side-menu',
  templateUrl: 'templates/menu.html'
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

  .state('menu.my-markings', {
    url: '/my-markings',
    views: {
      'side-menu': {
        templateUrl: 'templates/my-markings.html'
      }
    }
  })

  .state('menu.nearby', {
    url: '/nearby',
    views: {
      'side-menu': {
        templateUrl: 'templates/nearby.html'
      }
    }
  })

  .state('menu.new-marking', {
    url: '/new-marking',
    views: {
      'side-menu': {
        templateUrl: 'templates/new-marking.html'
      }
    }
  })

  .state('menu.profile', {
    url: '/profile',
    views: {
      'side-menu': {
        templateUrl: 'templates/profile.html'
      }
    }
  })

  $urlRouterProvider.otherwise('/signin')

  //$urlRouterProvider.otherwise("app/home");
})
