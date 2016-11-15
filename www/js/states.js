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


    //State da home
      .state('tabs.home', {
        url: "/home",
        views: {
          'home-page': {
            templateUrl: "views/home.html"
          }
        }
      })

      //State da tela de map
      .state('tabs.map', {
          url: "/map",
          views: {
              'map-page': {
                  templateUrl: "views/map.html",
                  controller: 'mapCtrl'
              }
          }
      })

      //State da tela de profile do usuário
      .state('tabs.profile', {
          url: '/profile',
          views: {
              'profile-page': {
                  templateUrl: 'views/user/userProfile.html',
                  controller: 'profileCtrl'
              }
          }
      })

      .state('tabs.markings', {
      url: '/markings',
      abstract: true,
      views: {
        'markings': {
          templateUrl: 'views/markings.html'
        }
      }
    })

    .state('tabs.newMarkings', {
      url: '/newMarkings',
      abstract: true,
      views: {
        'newMarkings': {
          templateUrl: 'views/newMarkings.html'
        }
      }
    })

     .state('tabs.to-contribuindo', {
       url: '/toContribuindo',
       abstract: true,
       views: {
         'to-contribuindo': {
           templateUrl: 'views/toContribuindo.html'
         }
       }
     })

  //State da tela de minhas marcações e marcacoes proximas
    .state('tabs.markings.myMarkings', {
      url: '/myMarkings',
      views: {
        'markings-page': {
          templateUrl: 'views/marking/myMarkings.html'
        }
      }
    })

  //State da tela de minhas pevs e pevs proximas
      .state('tabs.markings.myPEVS', {
        url: '/myPEVS',
        views: {
          'markings-page': {
            templateUrl: 'views/pev/myPevs.html'
          }
        }
      })

  //State da tela de cadastro de marcações/incidentes.
  .state('tabs.newMarkings.newMarking', {
    url: '/newMarking',
    views: {
      'new-markings-page': {
        templateUrl: 'views/marking/newMarking.html',
        controller: 'newMarkingCtrl'
      }
    }
  })

  //State da tela de cadastro de novas PEVs
      .state('tabs.newMarkings.newPEV', {
        url: '/newPEV',
        views: {
          'new-markings-page': {
            templateUrl: 'views/pev/newPEV.html',
            controller: 'newPevCtrl'
          }
        }
      })

  //State da tela do to contribuindo
      .state('tabs.to-contribuindo.articles', {
        url: '/articles',
        views: {
          'to-contribuindo-page': {
            templateUrl: 'views/contribute/myArticles.html',
            controller: 'articlesCtrl'
          }
        }
      })

  //State da tela do to contribuindo
  .state('tabs.to-contribuindo.projects', {
      url: '/projects',
      views: {
          'to-contribuindo-page': {
              templateUrl: 'views/contribute/myProjects.html',
              controller: 'projectsCtrl'
          }
      }
  })


  //State da tela de editar marcacoes
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




  //State da tela de editar profile do usuário
  .state('editProfile',{
    url: '/editProfile',
    templateUrl: 'views/user/editProfile.html',
    controller: 'editProfileCtrl'
  })




    //State do tutorial
    .state('tutorial', {
      url: '/tutorial',
      templateUrl: 'views/tutorial.html',
      controller: 'tutorialCtrl'
    });

  //State inicial do sistema definido em login.
  $urlRouterProvider.otherwise('/signin')
});
