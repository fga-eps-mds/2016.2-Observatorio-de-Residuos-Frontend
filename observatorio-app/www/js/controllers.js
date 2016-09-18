angular.module('app.controllers',[])

.controller('homeCtrl', ['$scope', '$stateParams',
  function ($scope, $stateParams) {
}])

.controller('my-markingsCtrl', ['$scope', '$stateParams',
  function ($scope, $stateParams) {
}])

.controller('new-markingCtrl', ['$scope', '$stateParams',
  function ($scope, $stateParams) {
}])

.controller('profileCtrl', ['$scope', '$stateParams',
  function ($scope, $stateParams) {
}])

.controller('nearbyCtrl', ['$scope', '$stateParams',
  function ($scope, $stateParams) {
}])

.controller('menuCtrl', ['$scope', '$stateParams',
  function ($scope, $stateParams) {
}])

.controller('signinCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {
// $scope.submit = function () {
//   $window.open('/side-menu21/page1', '_self');
}])

.controller('signupCtrl',
function ($scope, factoryRegister, $window) {
  $scope.registerEmail= function(isFormValid, user){
    if(isFormValid){
      console.log(user);
      factoryRegister.save(user, function(result){
        console.log(result);
        $scope.errorEmail = false
        $window.open("#/side-menu/home", "_self")
      }, function(error){
        $scope.errorEmail = true;
      })
    }
  }

})

.controller('loginController',
  function($scope, factoryRegister) {
})

  .directive('confirmPwd',
    function($interpolate, $parse) {
    return {
      require: 'ngModel',
      link: function(scope, elem, attr, ngModelCtrl) {

        var pwdToMatch = $parse(attr.confirmPwd);
        var pwdFn = $interpolate(attr.confirmPwd)(scope);

        scope.$watch(pwdFn, function(newVal) {
          ngModelCtrl.$setValidity('password', ngModelCtrl.$viewValue == newVal);
        })

        ngModelCtrl.$validators.password = function(modelValue, viewValue) {
          var value = modelValue || viewValue;
          return value == pwdToMatch(scope);
        };

      }
    }
  });
