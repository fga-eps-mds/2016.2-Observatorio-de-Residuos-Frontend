angular.module('starter')

.controller('facebookSignInCtrl', function($scope, $state, $q, socialLoginService, $ionicLoading) {

  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {

      var user = {};
      user.first_name = "hey";
      user.last_name = "you";
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
    facebookConnectPlugin.getLoginStatus(function(success){
      if(success.status === 'connected'){


        getFacebookProfileInfo(success.authResponse)
        .then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            var user = {};
            user.first_name = "hey";
            user.last_name = "you";
            user.email = profileInfo.email;
            socialLoginService.login(user);

          }, function(fail){
            // Fail get profile info
          });

      } else {


        $ionicLoading.show({
          template: 'Logging in...'
        });

        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };
})