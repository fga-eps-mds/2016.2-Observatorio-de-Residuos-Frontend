angular.module('starter')

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state('menu.home', {
  url: '/home',
  views: {
    'sideMenu': {
      templateUrl: 'views/home.html'
    }
  }
  })

  .state('menu', {
  url: '/sideMenu',
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
      'sideMenu': {
        templateUrl: 'views/marking/myMarkings.html'
      }
    }
  })

  .state('menu.nearbyMarkings', {
    url: '/nearbyMarkings',
    views: {
      'sideMenu': {
        templateUrl: 'views/marking/nearbyMarkings.html'
      }
    }
  })

  .state('menu.newMarking', {
    url: '/newMarking',
    views: {
      'sideMenu': {
        templateUrl: 'views/marking/newMarking.html'
      }
    }
  })

  .state('menu.profile', {
    url: '/profile',
    views: {
      'sideMenu': {
        templateUrl: 'views/user/userProfile.html'
      }
    }
  })

  $urlRouterProvider.otherwise('/signin')

  //$urlRouterProvider.otherwise("app/home");
})
