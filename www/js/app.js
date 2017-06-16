angular.module('starter', ['ionic', 'ngResource','app.controllers', 'ngMap', 'ngCordova'])

.run(function($ionicPlatform, currentUserService, $state, loginService,
              $rootScope, $ionicHistory) {

  $ionicPlatform.registerBackButtonAction(function(e) {
    if ($rootScope.backButtonPressedToExit) {
      ionic.Platform.exitApp();
    } else if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    } else {
      $rootScope.backButtonPressedToExit = true;
      window.plugins.toast.showShortBottom("Pressione novamente para sair");
      setTimeout(function(){
        $rootScope.backButtonPressedToExit = false;
      }, 2000);
    }
    e.preventDefault();

    return false;
  }, 101);

  $ionicPlatform.ready(function() {

    var resuming = false;

    document.addEventListener('resume', onResume);
    document.addEventListener('pause', onPause);

    function onResume(event) {
      resuming = true;

      console.log('resuming');

      if (event.pendingResult) {
        window.localStorage.setItem('takenPicture', event.pendingResult.result);
        currentUserService.setUserData(JSON.parse(window.localStorage.getItem('userData')));
        currentUserService.setUserMarking(JSON.parse(window.localStorage.getItem('userMarkings')));
        currentUserService.setUserPevs(JSON.parse(window.localStorage.getItem('userPevs')));
        $state.go(window.localStorage.getItem('state'));
      }
    }

    function onPause() {
      console.log('pausing');
      var userData = currentUserService.getUserData();
      var userMarkings = currentUserService.getUserMarking();
      var userPevs = currentUserService.getUserPevs();
      window.localStorage.setItem('userData', JSON.stringify(userData));
      window.localStorage.setItem('userMarkings', JSON.stringify(userMarkings));
      window.localStorage.setItem('userPevs', JSON.stringify(userPevs));
      window.localStorage.setItem('state',$state.current.name);
      console.log($state.current.name);
    }

    var user = window.localStorage.getItem('autoLoginUser');

    if (!resuming) {
      $state.go('signin');
    }

    // if (user) {
    //   user = JSON.parse(user);
    //   loginService.login({email: user.email}, user.password, true).then(function(success) {
    //   }, function(error) {
    //     $state.go('signin');  
    //   })
    // } else {
    //   $state.go('signin');
    // }
  })
})
