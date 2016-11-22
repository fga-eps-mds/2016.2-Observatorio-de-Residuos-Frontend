angular.module('starter')
/* Archive responsible to connect all controllers and respective views defining as states of application */
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){

  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider

  //State of initial login screen
  .state('signin', {
  url: '/signin',
  templateUrl: 'views/signIn.html',
  controller: 'signinCtrl'
  })

  //Sign Up state
  .state('signup', {
  url: '/signup',
  templateUrl: 'views/user/signUp.html',
  controller: 'signupCtrl'
  })

  //Tabs state
    .state('tabs', {
      url: '/tabs',
      abstract: true,
      templateUrl: 'views/tabs.html'
    })


    //Home state
      .state('tabs.home', {
        url: "/home",
        views: {
          'home-page': {
            templateUrl: "views/home.html"
          }
        }
      })

      //Map state
      .state('tabs.map', {
          url: "/map",
          views: {
              'map-page': {
                  templateUrl: "views/map.html",
                  controller: 'mapCtrl'
              }
          }
      })

      //Profile User state
      .state('tabs.profile', {
          url: '/profile',
          views: {
              'profile-page': {
                  templateUrl: 'views/user/userProfile.html',
                  controller: 'profileCtrl'
              }
          }
      })

      //State of markings initial page
      .state('tabs.markings', {
      url: '/markings',
      abstract: true,
      views: {
        'markings': {
          templateUrl: 'views/markings.html'
        }
      }
    })

      //New Marking state
    .state('tabs.newMarkings', {
      url: '/newMarkings',
      abstract: true,
      views: {
        'newMarkings': {
          templateUrl: 'views/newMarkings.html'
        }
      }
    })

     //State of to contribuindo initial page
     .state('tabs.to-contribuindo', {
       url: '/toContribuindo',
       abstract: true,
       views: {
         'to-contribuindo': {
           templateUrl: 'views/toContribuindo.html'
         }
       }
     })

     //State of my markings and nearby markings
    .state('tabs.markings.myMarkings', {
      url: '/myMarkings',
      views: {
        'markings-page': {
          templateUrl: 'views/marking/myMarkings.html',
          controller: 'markingsCtrl'
        }
      }
    })

      //State of my pevs and nearby pevs
      .state('tabs.markings.myPEVS', {
        url: '/myPEVS',
        views: {
          'markings-page': {
            templateUrl: 'views/pev/myPevs.html'
          }
        }
      })

  //State of register marking screen
  .state('tabs.newMarkings.newMarking', {
    url: '/newMarking',
    views: {
      'new-markings-page': {
        templateUrl: 'views/marking/newMarking.html',
        controller: 'newMarkingCtrl'
      }
    }
  })

      //State of new pevs screen
      .state('tabs.newMarkings.newPEV', {
        url: '/newPEV',
        views: {
          'new-markings-page': {
            templateUrl: 'views/pev/newPEV.html',
            controller: 'newPevCtrl'
          }
        }
      })

      //Tô Contribuindo Articles State
      .state('tabs.to-contribuindo.articles', {
        url: '/articles',
        views: {
          'to-contribuindo-page': {
            templateUrl: 'views/contribute/myArticles.html',
            controller: 'articlesCtrl'
          }
        }
      })

  //Tô Contribuindo Projects State
  .state('tabs.to-contribuindo.projects', {
      url: '/projects',
      views: {
          'to-contribuindo-page': {
              templateUrl: 'views/contribute/myProjects.html',
              controller: 'projectsCtrl'
          }
      }
  })

      //Detail Article State
          .state('tabs.to-contribuindo.detailArticle', {
              url: '/detail_article',
              views: {
                  'to-contribuindo-page': {
                      templateUrl: 'views/contribute/detailArticle.html',
                      controller: 'selectedArticleCtrl'
                  }
              }
          })

      //Detail Projects State
      .state('tabs.to-contribuindo.detailProject', {
          url: '/detail_project',
          views: {
              'to-contribuindo-page': {
                  templateUrl: 'views/contribute/detailProject.html',
                  controller: 'selectedProjectCtrl'
              }
          }
      })

    //Detail Marking State
      .state('tabs.markings.detailMarking', {
          url: '/detail_marking',
          views: {
              'markings-page': {
                  templateUrl: 'views/marking/detailMarking.html',
                  controller: 'selectedMarkingCtrl'
              }
          }
      })

      //Detail Pev State
      .state('tabs.markings.detailPev', {
          url: '/detail_pev',
          views: {
              'markings-page': {
                  templateUrl: 'views/pev/detailPev.html',
                  controller: 'selectedPevCtrl'
              }
          }
      })


  //Edit profile user state
  .state('editProfile',{
    url: '/editProfile',
    templateUrl: 'views/user/editProfile.html',
    controller: 'editProfileCtrl'
  })

  //Complaint Marking state
  .state('complaintMarking',{
    url: '/complaintMarking',
    controller: 'complaintMarkingCtrl',
    templateUrl: 'views/complaint/complaintMarking.html'
  })

  //Complaint Pev state
  .state('complaintPev',{
    url: '/complaintPev',
    controller: 'complaintPevCtrl',
    templateUrl: 'views/complaint/complaintPev.html'
  })

  //Tutorial state
    .state('tutorial', {
      url: '/tutorial',
      templateUrl: 'views/tutorial.html',
      controller: 'tutorialCtrl'
    });

  //Initial state of system defined in login
  $urlRouterProvider.otherwise('/signin')
});
