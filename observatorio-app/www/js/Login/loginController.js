angular.module('starter')

.controller('loginController', function($scope, factoryRegister) {

$scope.registerEmail= function(user){
  console.log(user);
  factoryRegister.save(user, function(result){
    console.log(result);
  }, function(error){
    console.log(error);
  })
}

});
