angular.module('starter')
/*Arquivo responsável por conectar todas as controllers e suas views definindo como states da aplicação*/
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  //State da home
  .state('menu.home', {
  url: '/home',
  views: {
    'side-menu': {
      templateUrl: 'views/home.html',
    }
  }
  })
  //State do menu lateral
  .state('menu', {
  url: '/side-menu',
  templateUrl: 'views/menu.html'
  })

  //State da tela de login inicial.
  .state('signin', {
  url: '/signin',
  templateUrl: 'views/signIn.html',
  controller: 'signinCtrl'
  })

  //State da tela de cadastro
  .state('signup', {
  url: '/signup',
  templateUrl: 'views/user/signUp.html',
  controller: 'signupCtrl'
  })

  //State da tela de minhas marcações.
  .state('menu.myMarkings', {
    url: '/myMarkings',
    views: {
      'side-menu': {
        templateUrl: 'views/marking/myMarkings.html'
      }
    }
  })

  //State da tela de marcações próximas.
  .state('menu.nearbyMarkings', {
    url: '/nearbyMarkings',
    views: {
      'side-menu': {
        templateUrl: 'views/marking/nearbyMarkings.html'
      }
    }
  })

  //State da tela de cadastro de marcações/incidentes.
  .state('menu.newMarking', {
    url: '/newMarking',
    views: {
      'side-menu': {
        templateUrl: 'views/marking/newMarking.html',
        controller: 'markingCtrl'
      }
    }
  })

  //State da tela de cadastro de novas PEVs
  .state('menu.newPEV', {
    url: '/newPEV',
    views: {
      'side-menu': {
        templateUrl: 'views/newPEV.html'
      }
    }
  })

  //State da tela de profile do usuário
  .state('menu.profile', {
    url: '/profile',
    views: {
      'side-menu': {
        templateUrl: 'views/user/userProfile.html'
      }
    }
  })

  //State inicial do sistema definido em login.
  $urlRouterProvider.otherwise('/signin')
})
