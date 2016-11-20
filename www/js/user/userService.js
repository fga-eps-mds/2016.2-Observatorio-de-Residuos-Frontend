angular.module('starter')
/* Service responsible to transport actual user for all application
  setUserData: Used in signInControllers to define actual user
  getUserData: Used to recover actual user where necessary, for example in profile screen */

.service('currentUserService',function(){
  var userData = "";
  var setUserData = function(paramUserData){
    userData = paramUserData
  }
  var getUserData = function(){
    return userData
  }
  var setUserMarking = function(paramUserMarking ){
    userMarking  = paramUserMarking 
  }
  var getUserMarking = function(){
    return userMarking
  }
  return {
    setUserData: setUserData,
    getUserData: getUserData,
    setUserMarking: setUserMarking,
    getUserMarking: getUserMarking
  }
})
