angular.module('starter')
/*Arquivo responsável por conectar todas as controllers e suas views definindo como states da aplicação*/
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  //State da home
  .state('tabs.home', {
  url: '/home',
  views: {
    'home': {
      templateUrl: 'views/home.html',
    }
  }
  })

  //State da tela de login inicial.
  .state('signin', {
  url: '/signin',
  templateUrl: 'views/signIn.html',
  controller: 'signinCtrl'
  })

  //State da telav de cadastro
  .state('signup', {
  url: '/signup',
  templateUrl: 'views/user/signUp.html',
  controller: 'signupCtrl'
  })

  //State da tela de minhas marcações.
  .state('tabs.myMarkings', {
    url: '/myMarkings',
    views: {
      'tab-view': {
        templateUrl: 'views/marking/myMarkings.html'
      }
    }
  })

  //State da tela de marcações próximas.
  .state('tabs.nearbyMarkings', {
    url: '/nearbyMarkings',
    views: {
      'tab-view': {
        templateUrl: 'views/marking/nearbyMarkings.html'
      }
    }
  })

  //State da tela de cadastro de marcações/incidentes.
  .state('tabs.newMarking', {
    url: '/newMarking',
    views: {
      'tab-view': {
        templateUrl: 'views/marking/newMarking.html',
        controller: 'markingCtrl'
      }
    }
  })

  //State da tela de cadastro de novas PEVs
  .state('tabs.newPEV', {
    url: '/newPEV',
    views: {
      'tab-view': {
        controller: 'newPevCtrl',
        templateUrl: 'views/pev/newPEV.html'
      }
    }
  })

  //State da tela de profile do usuário
  .state('tabs.profile', {
    url: '/profile',
    views: {
      'profile': {
        templateUrl: 'views/user/userProfile.html'
      }
    }
  })

  //State da tela de ajuda
    .state('tabs.ajuda', {
      url: '/ajuda',
      views: {
        'ajuda': {
          templateUrl: 'views/ajuda.html'
        }
      }
    })

   //State da tela de tabs
    .state('tabs', {
      url: '/tabs',
      abstract :true,
      templateUrl: 'views/tabs.html',
      controller: 'popoverCtrl'
    })

  //State da tela de map
    .state('tabs.map', {
      url: '/map',
      views: {
        'tab-view': {
          templateUrl: 'views/map.html'
        }
      }
    })

    //State da tela do to contribuindo
    .state('tabs.toContribuindo', {
      url: '/toContribuindo',
      views: {
        'tab-view': {
          templateUrl: 'views/contribute/toContribuindo.html'
        }
      }
    })

  //State inicial do sistema definido em login.
  $urlRouterProvider.otherwise('/signin')
})
