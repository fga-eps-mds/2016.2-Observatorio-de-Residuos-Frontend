angular.module('starter')
/*Arquivo responsável por conectar todas as controllers e suas views definindo como states da aplicação*/
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){

  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider

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

  //State da tela de tabs
    .state('tabs', {
      url: '/tabs',
      abstract: true,
      templateUrl: 'views/tabs.html'
    })

      abstract: true,
      views: {
        }
      }
    })

      abstract: true,
      views: {
        }
      }
    })

      }


  //State da tela de cadastro de marcações/incidentes.
    url: '/newMarking',
    views: {
        templateUrl: 'views/marking/newMarking.html',
        controller: 'newMarkingCtrl'
      }
    }
  })

  .state('editMarking', {
    url: '/editMarkings',
      controller: 'editMarkingCtrl',
      templateUrl: 'views/marking/editMarkings.html'
  })

    //State da tela de editar PEVs
  .state('editPEV', {
    url: '/editPEV',
      controller: 'editPevCtrl',
      templateUrl: 'views/pev/editPEV.html'
  })

  //State da tela de profile do usuário
  .state('profile', {
    url: '/profile',
    templateUrl: 'views/user/userProfile.html',
    controller: 'profileCtrl'
    })

  //State da tela de editar profile do usuário
  .state('editProfile',{
    url: '/editProfile',
    templateUrl: 'views/user/editProfile.html',
    controller: 'editProfileCtrl'
  })

  //State da tela de map
      url: '/map',
    })


    //State do tutorial
    .state('tutorial', {
      url: '/tutorial',
      templateUrl: 'views/tutorial.html',
      controller: 'tutorialCtrl'

  //State inicial do sistema definido em login.
  $urlRouterProvider.otherwise('/signin')
