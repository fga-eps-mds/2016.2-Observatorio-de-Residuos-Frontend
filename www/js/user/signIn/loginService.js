angular.module('starter')

.service('loginService', function($ionicLoading, $state, factoryLogin, $http, currentUserService, 
  $ionicHistory, $ionicPopup, URL, $q) {

  var login = function(user, password, autoLogin) {

    var deferred = $q.defer();

    user.encripted_password = String(CryptoJS.SHA256(password));

    $ionicLoading.show({
      template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
    });

    factoryLogin.save(user, function(result) {
      $http.get(URL + "/user/" + result.id_usuario + "/markings")
      .success(function(seenMarkings) {
        $http.get(URL + "/user/" + result.id_usuario + "/pevs")
        .success(function(seenPevs) {
          $ionicLoading.hide();
          currentUserService.setUserData(result);
          currentUserService.setUserMarking(seenMarkings);
          currentUserService.setUserPevs(seenPevs);
          $ionicHistory.nextViewOptions({disableBack:true});
          
          if(autoLogin) {
            var userToAutoLogin = {
              email: user.email,
              password: password
            };
            window.localStorage.setItem('autoLoginUser', JSON.stringify(userToAutoLogin));
          } else {
            window.localStorage.removeItem('autoLoginUser');
          }

          $state.go('tabs.home');
          deferred.resolve(true);
        })
        .error(function(error) {
          $ionicLoading.hide();
          console.log(error);
        });
      })
      .error(function(error) {
        $ionicLoading.hide();
        console.log(error);
      });

    }, function(error) {
      $ionicLoading.hide();

      if(error.status == 403) {
        $ionicPopup.alert({
          template: 'Esta conta está desativada.',
          title: 'Erro'
        });
      } else {
        $ionicLoading.hide();
        deferred.reject(false);
      } 

    });

    return deferred.promise;
  };

  return {
    login: login
  };

});