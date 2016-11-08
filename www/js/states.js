angular.module('starter')
/*Arquivo responsável por conectar todas as controllers e suas views definindo como states da aplicação*/
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){

  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider

  //State da home
  .state('home', {
    url: '/home',
    templateUrl: 'views/home.html'
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

  //State da tela de tabs
    .state('tabs', {
      url: '/tabs',
      abstract: true,
      templateUrl: 'views/tabs.html'
    })

    .state('tabs.toDeOlho', {
      url: '/toDeOlho',
      abstract: true,
      views: {
        'toDeOlho': {
          templateUrl: 'views/marking/toDeOlho.html',
        }
      }
    })

    .state('tabs.PEV', {
      url: '/PEV',
      abstract: true,
      views: {
        'PEV': {
          templateUrl: 'views/pev/pevs.html'
        }
      }
    })

  //State da tela de minhas marcações.
  .state('tabs.toDeOlho.myMarkings', {
    url: '/myMarkings',
    views: {
      'markings-page': {
        templateUrl: 'views/marking/myMarkings.html'
      }
    }
  })

  //State da tela de marcações próximas.
  .state('tabs.toDeOlho.nearbyMarkings', {
    url: '/nearbyMarkings',
    views: {
      'markings-page': {
        templateUrl: 'views/marking/nearbyMarkings.html'
      }
    }
  })

  //State da tela de cadastro de marcações/incidentes.
  .state('tabs.toDeOlho.newMarking', {
    url: '/newMarking',
    views: {
      'markings-page': {
        templateUrl: 'views/marking/newMarking.html',
        controller: 'newMarkingCtrl'
      }
    }
  })

  //State da tela de cadastro de novas PEVs
  .state('tabs.PEV.newPEV', {
    url: '/newPEV',
    views: {
      'pev-page': {
        controller: 'newPevCtrl',
        templateUrl: 'views/pev/newPEV.html'
      }
    }
  })

    //State da tela de editar PEVs
  .state('tabs.PEV.editPEV', {
    url: '/editPEV',
    views: {
      'pev-page': {
        controller: 'editPevCtrl',
        templateUrl: 'views/pev/editPEV.html'
      }
    }
  })
  //State da tela de PEVs próximas
  .state('tabs.PEV.nearbyPEVs', {
    url: '/nearbyPEVs',
    views: {
      'pev-page': {
        templateUrl: 'views/pev/nearbyPEVs.html'
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


  //State da tela de map
    .state('tabs.map', {
      url: '/map',
      views: {
        'mapaObservatorio': {
          templateUrl: 'views/map.html',
          controller: 'mapCtrl'
        }
      }
    })

    //State da tela do to contribuindo
    .state('tabs.toContribuindo', {
      url: '/toContribuindo',
      views: {
        'toContribuindo': {
          templateUrl: 'views/contribute/toContribuindo.html'
        }
      }
    })

    //State do tutorial
    .state('tutorial', {
      url: '/tutorial',
      templateUrl: 'views/tutorial.html',
      controller: 'tutorialCtrl'
    })

  //State inicial do sistema definido em login.
  $urlRouterProvider.otherwise('/signin')
})
