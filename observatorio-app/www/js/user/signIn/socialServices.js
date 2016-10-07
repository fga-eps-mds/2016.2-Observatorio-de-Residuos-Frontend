angular.module('starter')

.service('currentUserService',function(){
  var userData = "";
  var setUserData = function(paramUserData){
    userData = paramUserData
  }
  var getUserData = function(){
    console.log(userData)
    return userData
  }
  return {
    setUserData: setUserData,
    getUserData: getUserData
  }
})

.service('googleExtractor', function(){
var userData = "";
var extract = function(authData){
  userData = authData;
  userData.first_name = authData.google.cachedUserProfile.given_name;
  userData.last_name  = authData.google.cachedUserProfile.family_name;
  userData.gender = authData.google.cachedUserProfile.gender;
  userData.email = authData.google.email;
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
  return userData;
}
  return{
    extract: extract
  }
})


.service('userDataExtractorService',function(facebookExtractor, googleExtractor){
  var userData = "";
  var extract = function(authData, paramSocialNetwork){
    userData = authData;
    if(paramSocialNetwork == 'facebook'){
      userData = facebookExtractor.extract(authData);
    }else{
      userData = googleExtractor.extract(authData);
    }
    userData.profile_type = "cidadao";
  }
  var getData = function(){
    return userData
  }
  return {
    extract: extract,
    getData: getData
  }
})
