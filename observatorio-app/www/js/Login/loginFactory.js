angular.module('starter')

.factory('factoryRegister', function($resource,URL) {
  return $resource(URL+"/users/create")
})
.factory('factoryLogin', function($resource, URL){
  return $resource(URL+"/sessions/login")
});
