angular.module('starter')

.controller('facebookSignInCtrl', function($scope, $state, $q, socialLoginService, 
                                           $ionicLoading, userDataExtractorService) {

  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {

      var user = {};
      user.email = profileInfo.email;
      socialLoginService.login(user);
      
    }, function(fail){
      console.log(fail);
    });
  };

  var fbLoginError = function(error){
    $ionicLoading.hide();
  };

  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        info.resolve(response);
      },
      function (response) {
        info.reject(response);
      }
      );
    return info.promise;
  };

  $scope.facebookSignIn = function() {
   $ionicLoading.show({
    template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
  });
    facebookConnectPlugin.getLoginStatus(function(result){
      if(result.status === 'connected'){
        result.credential = {};
        result.credential.accessToken = result.authResponse.accessToken;

        getFacebookProfileInfo(result.authResponse)
        .then(function(profileInfo) {
            var user = {};
            userDataExtractorService.extract(result, 'facebook').then(function(user){
              user.email = profileInfo.email;
              user.first_name = profileInfo.first_name;
              user.last_name = profileInfo.last_name;
              user.gender = profileInfo.gender;
              socialLoginService.login(user);
            });
          }, function(fail){
            console.log(fail);
          });

      } else {

        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };
})