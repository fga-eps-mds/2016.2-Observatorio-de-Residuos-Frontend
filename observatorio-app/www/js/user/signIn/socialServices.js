angular.module('starter')

.service('googleExtractor', function(){
var userData = "";
var extract = function(authData){
  userData = authData;
  userData.first_name = authData.google.cachedUserProfile.given_name;
  userData.last_name  = authData.google.cachedUserProfile.family_name;
  userData.gender = authData.google.cachedUserProfile.gender;
  userData.email = authData.google.email;
  console.log(userData)
  return userData;
}
  return{
    extract: extract
  }
})

.service('facebookExtractor', function(){
var userData = "";
var extract = function(authData){
  userData = authData;
  userData.first_name = authData.facebook.cachedUserProfile.first_name;
  userData.last_name = authData.facebook.cachedUserProfile.last_name;
  userData.gender = authData.facebook.cachedUserProfile.gender;
  userData.email = authData.facebook.email;
  console.log(userData)
  return userData;
}
  return{
    extract: extract
  }
})


.service('userDataExtractorService',function(facebookExtractor, googleExtractor){
  var extract = function(authData, paramSocialNetwork){
    authData.profile_type = "cidadao";
    if(paramSocialNetwork == 'facebook'){
      return facebookExtractor.extract(authData);
    }else{
      return googleExtractor.extract(authData);
    }
  }
  return {
    extract: extract
  }
})

.service('firebaseService', function(userDataExtractorService){
  var ref = new Firebase("dojogrupo04.firebaseio.com");
  var userData;
  var socialLogin = function(socialNetwork){
    ref.authWithOAuthPopup(socialNetwork, function(error, authData){
      if(error){
        console.log("Failed ", error)
        userData = null;
      }
      else{
        console.log("rola12312312")
        userData =  userDataExtractorService.extract(authData, socialNetwork);
      }
    },{
      scope: "email"
    })
  }
  var getData = function(){
    return userData
  }
    return{
      getData: getData,
      socialLogin: socialLogin
    }
})

.service('socialLoginService', function(factoryEmail, $state ,currentUserService){
  var login = function(user){
    factoryEmail.save({"email": user.email}, function(result) {
      currentUserService.setUserData(user)
      if(result.userExist){
        $state.go('menu.home')
      }else{
        $state.go('signup')
      }
    }, function(error){
      console.log(error)
    })
  }
  return{
    login : login
  }
})
