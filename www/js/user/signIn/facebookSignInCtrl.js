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
      
      $ionicLoading.hide();
    }, function(fail){
      // Fail get profile info
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    $ionicLoading.hide();
  };

  // This method is to get the user profile info from the facebook api
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
    template: 'Por favor, aguarde...'
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
              socialLoginService.login(user);
            });
          }, function(fail){
            // Fail get profile info
          });

      } else {

        facebookConnectPlugin.login(['email', 'first_name', 'last_name', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };
})