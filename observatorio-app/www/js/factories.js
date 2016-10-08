angular.module('starter')
/*Factories da aplicação responsáveis por acessar determinadas urls do rails*/
//Factory para registro de usuário.
.factory('factoryRegister', function($resource,URL) {
  return $resource(URL+"/users/create")
})
//Factory para o login do usuário
.factory('factoryLogin', function($resource, URL){
  return $resource(URL+"/sessions/login")
})
//Factory de verificação de email válido.
.factory('factoryEmail', function($resource, URL){
  return $resource(URL+"/users/verify_email")
});
