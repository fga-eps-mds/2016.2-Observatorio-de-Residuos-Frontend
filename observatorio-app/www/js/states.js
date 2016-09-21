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

  $urlRouterProvider.otherwise('/signin')

  //$urlRouterProvider.otherwise("app/home");
})
