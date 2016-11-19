angular.module('starter')
/*Service responsável por transportar o usuário atual por toda a aplicação.
  setUserData: Utilizado nas signInControllers para definir o usuário atual
  getUserData: Utilizado para recuperar o usuário atual onde necessario, por exemplo na tela de perfil.
*/

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
