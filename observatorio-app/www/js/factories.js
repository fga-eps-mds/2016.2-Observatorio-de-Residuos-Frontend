angular.module('starter')

.factory('factoryRegister', function($resource,URL) {
  return $resource(URL+"/users/create")
})

.factory('factoryLogin', function($resource, URL){
  return $resource(URL+"/sessions/login")
})

.factory('factoryPEV', function($resource, URL){
  return $resource(URL+"/pevs/create")
})

.factory('factoryEmail', function($resource, URL){
  return $resource(URL+"/users/verify_email")
});
