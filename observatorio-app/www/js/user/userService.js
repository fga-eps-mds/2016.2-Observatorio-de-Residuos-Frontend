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
