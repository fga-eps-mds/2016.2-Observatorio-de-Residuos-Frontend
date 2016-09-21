angular.module('starter')

.factory('factoryRegister', function($resource,URL) {
  return $resource(URL+"/users/create")
})

.factory('factoryMarking', function($resource,URL){
  return $resource(URL+"/markings/create")
});
