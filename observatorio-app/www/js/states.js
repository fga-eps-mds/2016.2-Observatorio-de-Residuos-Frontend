angular.module('starter')

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state('menu.home', {
  url: '/home',
  views: {
    'side-menu': {
      templateUrl: 'views/home.html'
    }
  }
  })

  .state('menu', {
  url: '/side-menu',
  templateUrl: 'views/menu.html'
  })

  .state('signin', {
  url: '/signin',
  templateUrl: 'views/signIn.html',
  controller: 'signinCtrl'
  })

  .state('signup', {
  url: '/signup',
  templateUrl: 'views/user/signUp.html',
  controller: 'signupCtrl'
  })

  .state('menu.myMarkings', {
    url: '/myMarkings',
    views: {
      'side-menu': {
        templateUrl: 'views/marking/myMarkings.html'
      }
    }
  })

  .state('menu.nearbyMarkings', {
    url: '/nearbyMarkings',
    views: {
      'side-menu': {
        templateUrl: 'views/marking/nearbyMarkings.html'
      }
    }
  })

  .state('menu.newMarking', {
    url: '/newMarking',
    views: {
      'side-menu': {
        templateUrl: 'views/marking/newMarking.html'
      }
    }
  })

  .state('menu.newPEV', {
    url: '/newPEV',
    views: {
      'side-menu': {
        templateUrl: 'views/pev/newPEV.html'
      }
    }
  })

  .state('menu.profile', {
    url: '/profile',
    views: {
      'side-menu': {
        templateUrl: 'views/user/userProfile.html'
      }
    }
  })

  $urlRouterProvider.otherwise('/signin')

  //$urlRouterProvider.otherwise("app/home");
})
