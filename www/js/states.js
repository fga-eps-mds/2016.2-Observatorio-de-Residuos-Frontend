angular.module('starter')

.config(function($stateProvider, $ionicConfigProvider){
  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider

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

  .state('tabs', {
    url: '/tabs',
    abstract: true,
    templateUrl: 'views/tabs.html'
  })

  .state('tabs.home', {
    url: "/home",
    views: {
      'home-page': {
        templateUrl: "views/home.html"
      }
    }
  })

  .state('tabs.map', {
    url: "/map",
    views: {
      'map-page': {
        templateUrl: "views/map.html",
        controller: 'mapCtrl'
      }
    }
  })

  .state('tabs.profile', {
    cache: false,
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

  .state('tabs.markings.myMarkings', {
    url: '/myMarkings',
    views: {
      'markings-page': {
        templateUrl: 'views/marking/myMarkings.html',
        controller: 'markingsCtrl'
      }
    }
  })

  .state('tabs.markings.myPEVS', {
    url: '/myPEVS',
    views: {
      'markings-page': {
        templateUrl: 'views/pev/myPevs.html',
        controller: 'pevsCtrl'
      }
    }
  })

  .state('tabs.newMarkings.newMarking', {
    url: '/newMarking',
    views: {
      'new-markings-page': {
        templateUrl: 'views/marking/newMarking.html',
        controller: 'newMarkingCtrl'
      }
    }
  })

  .state('tabs.newMarkings.newPEV', {
    url: '/newPEV',
    views: {
      'new-markings-page': {
        templateUrl: 'views/pev/newPEV.html',
        controller: 'newPevCtrl'
      }
    }
  })

  .state('tabs.to-contribuindo.articles', {
    url: '/articles',
    views: {
      'to-contribuindo-page': {
        templateUrl: 'views/contribute/myArticles.html',
        controller: 'articlesCtrl'
      }
    }
  })

  .state('tabs.to-contribuindo.projects', {
    url: '/projects',
    views: {
      'to-contribuindo-page': {
        templateUrl: 'views/contribute/myProjects.html',
        controller: 'projectsCtrl'
      }
    }
  })

  .state('tabs.to-contribuindo.detailArticle', {
    url: '/detail_article',
    views: {
      'to-contribuindo-page': {
        templateUrl: 'views/contribute/detailArticle.html',
        controller: 'selectedArticleCtrl'
      }
    }
  })

  .state('tabs.to-contribuindo.detailProject', {
    url: '/detail_project',
    views: {
      'to-contribuindo-page': {
        templateUrl: 'views/contribute/detailProject.html',
        controller: 'selectedProjectCtrl'
      }
    }
  })

  .state('tabs.markings.detailMarking', {
    url: '/detail_marking',
    views: {
      'markings-page': {
        templateUrl: 'views/marking/detailMarking.html',
        controller: 'selectedMarkingCtrl'
      }
    }
  })

  .state('tabs.markings.detailPev', {
    url: '/detail_pev',
    views: {
      'markings-page': {
        templateUrl: 'views/pev/detailPev.html',
        controller: 'selectedPevCtrl'
      }
    }
  })

  .state('editProfile',{
    url: '/editProfile',
    templateUrl: 'views/user/editProfile.html',
    controller: 'editProfileCtrl'
  })

  .state('complaintMarking',{
    url: '/complaintMarking',
    controller: 'complaintMarkingCtrl',
    templateUrl: 'views/complaint/complaintMarking.html'
  })

  .state('complaintPev',{
    url: '/complaintPev',
    controller: 'complaintPevCtrl',
    templateUrl: 'views/complaint/complaintPev.html'
  })

  .state('tutorial', {
    url: '/tutorial',
    templateUrl: 'views/tutorial.html',
    controller: 'tutorialCtrl'
  });

});
