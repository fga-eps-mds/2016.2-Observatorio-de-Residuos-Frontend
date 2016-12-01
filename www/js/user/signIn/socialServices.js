angular.module('starter')

.service('googleExtractor', function() {
  var userData = {};
  var extract = function(paramUserData) {
    userData.first_name = paramUserData.given_name;
    userData.last_name  = paramUserData.family_name;
    userData.gender = paramUserData.gender;
    userData.email = paramUserData.email;
    userData.profile_type = paramUserData.profile_type;
    return userData;
  }
  return{
    extract: extract
  }
})

.service('facebookExtractor', function() {
  var userData = {};
  var extract = function(paramUserData) {
    userData.first_name = paramUserData.first_name;
    userData.last_name = paramUserData.last_name;
    userData.gender = paramUserData.gender;
    userData.email = paramUserData.email;
    return userData;
  }
  return{
    extract: extract
  }
})

.service('userDataExtractorService',function(facebookExtractor, googleExtractor,$http,$q) {
  var deferred = $q.defer();
  var extract = function(result, paramSocialNetwork) {
    result.profile_type = "cidadao";
    if (paramSocialNetwork == 'facebook') {
      var fields = 'first_name, last_name, gender, email';
      $http.get('https://graph.facebook.com/me?fields=' + fields + '&access_token=' + result.credential.accessToken)
      .success(function(userData) {
        deferred.resolve(facebookExtractor.extract(userData));
      })
      .error(function(error) {
       deferred.resolve(error);
       console.log('error: ' + error);
     })
    }else{
      $http.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + result.credential.accessToken)
      .success(function(userData){
        deferred.resolve(googleExtractor.extract(userData));
      })
      .error(function(error){
        deferred.resolve(error);
        console.log(error);
      })
    }
    return deferred.promise;
  }
  return {
    extract: extract
  }
})

.service('socialLoginService', function(factoryEmail, $state ,currentUserService, URL, 
  $http, $ionicHistory, $ionicPopup, $ionicLoading) {
  var login = function(user) {
    factoryEmail.save({"email": user.email}, function(result) {
      user.nome_completo = user.first_name +" "+ user.last_name;
      currentUserService.setUserData(user)
      if (result.newUser){
        $ionicLoading.hide();
        $state.go('signup');
      } else {
        $http.get(URL + "/user/" + result.id_usuario + "/markings")
        .success(function(seenMarkings) {
          $http.get(URL + "/user/" + result.id_usuario + "/pevs")
          .success(function(seenPevs) {
            currentUserService.setUserData(result);
            currentUserService.setUserMarking(seenMarkings);
            currentUserService.setUserPevs(seenPevs);
            $ionicHistory.nextViewOptions({disableBack:true});
            $ionicLoading.hide();
            $state.go('tabs.home');
          })
          .error(function(error) {
            $ionicLoading.hide();
            $ionicPopup.alert({
              template: 'Falha na conexão.',
              title: 'Erro'
            });
            console.log(error);
          });
        })
        .error(function(error) {
          console.log(error);
        });
      }
    }, function(error) {
      $ionicLoading.hide();
      if(error.status == 403) {
        $ionicPopup.alert({
          template: 'Esta conta está desativada.',
          title: 'Erro'
        });
      } else {
        console.log(error);
      }
    })
  }
  return{
    login : login
  }
})
