angular.module('starter')
//Services responsable for realize login and sign up with social medias


/* googleExtractor
     extract: Extract received data of authData in google form*/
.service('googleExtractor', function(){
var userData = {};
var extract = function(paramUserData){
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

/* facebookExtractor
    extract: Extract received data of authData in facebook form. */
.service('facebookExtractor', function(){
var userData = {};
var extract = function(paramUserData){
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

/* userDataExtractorService
      extract: Responsible to decide which social media is on use and call proper extractor services */
.service('userDataExtractorService',function(facebookExtractor, googleExtractor,$http,$q){
  var deferred = $q.defer();
  var extract = function(result, paramSocialNetwork){
    result.profile_type = "cidadao";
    if(paramSocialNetwork == 'facebook'){
      var fields = 'first_name, last_name, gender, email';
      $http.get('https://graph.facebook.com/me?fields=' +fields + '&access_token=' + result.credential.accessToken)
      .success(function(userData){
        console.log(facebookExtractor.extract(userData));
        deferred.resolve(facebookExtractor.extract(userData));
       })
       .error(function(error) {
         deferred.resolve(error);
       console.log('error: ' + error);
       })
    }else{
      $http.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+result.credential.accessToken)
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

/* firebaseService
      Responsible to instance firebase object to receive user data

      socialLogin: Receive a string of a desired social media and realize authentification
                  in case of sucess call service to extract data and save user
                  in case of error save a null user

      getData: Method to acess user informations saved
              after loading all of them in login method */

.service('firebaseService', function(userDataExtractorService, socialLoginService, $http){
  var userData = {};
  var socialLogin = function(socialNetwork){
    var provider = (socialNetwork == 'google')?new firebase.auth.GoogleAuthProvider():new firebase.auth.FacebookAuthProvider();
    if(socialNetwork=="facebook"){
      provider.addScope('public_profile');
    }
    firebase.auth().signInWithPopup(provider).then(function(result) {
        userDataExtractorService.extract(result, socialNetwork).then(function(userData){
          socialLoginService.login(userData);
        })
    }).catch(function(error) {
      console.log({'FirebaseError': error})
    });
  }
  var getData = function(){
    return userData
  }
    return{
      getData: getData,
      socialLogin: socialLogin
    }
})

/* socialLoginService
    login: Responsible for validating received firebase data and decide which state this user have to be send */
.service('socialLoginService', function(factoryEmail, $state ,currentUserService){
  var login = function(user){
    factoryEmail.save({"email": user.email}, function(result) {
      user.nome_completo = user.first_name +" "+ user.last_name;
      currentUserService.setUserData(user)
      if(result.newUser){
        $state.go('signup');
      } else {
        currentUserService.setUserData(result);
        $state.go('tabs.home');
      }
    }, function(error){
      console.log(error)
    })
  }
  return{
    login : login
  }
})
