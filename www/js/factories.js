angular.module('starter')
/* Application Factories responsible to acess determined rails urls */
//Factory to register user
.factory('factoryRegister', function($resource,URL) {
  return $resource(URL+"/users/create");
})

//Factory for factory deactivation
.factory('factoryDeactivation', function($resource, URL){
  return $resource(URL+"/users/deactivate");
})

//Factory for user login
.factory('factoryLogin', function($resource, URL){
  return $resource(URL+"/sessions/login");
})

//Factory for PEV creation
.factory('factoryPEV', function($resource, URL){
  return $resource(URL+"/pevs/create");
})

//Factory for PEV edition
.factory('factoryEditPEV', function($resource, URL){
  return $resource(URL+"/pevs/edit");
})

//Factory to verify valid email
.factory('factoryEmail', function($resource, URL){
  return $resource(URL+"/users/verify_email");
})

//Factory for incident creation
.factory('factoryMarking', function($resource, URL){
  return $resource(URL+"/markings/create");
})

//Factory for profile edition
.factory('factoryProfile', function($resource, URL){
  return $resource(URL+"/users/edit");
})
//Factory for incident edition
.factory('factoryEditMarking', function($resource, URL){
  return $resource(URL+"/markings/edit");
})

//Factory for complaints
.factory('factoryComplaint', function($resource, URL){
  return $resource(URL+"/complaints/create");
});
