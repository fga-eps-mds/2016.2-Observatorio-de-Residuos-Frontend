angular.module('app.controllers', [])

.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
}])


.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('signinCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {
  $scope.loginAttempt = function(isFormValid, user){
    if(isFormValid){
      console.log(user);
      $state.go("menu.home")
    }
  }
})

.controller('signupCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, factoryRegister, $state) {
  $scope.registerEmail= function(isFormValid, user){
    if(isFormValid){
      console.log(user);
      factoryRegister.save(user, function(result){
        console.log(result);
        $scope.errorEmail = false
        $state.go("menu.home")
      }, function(error){
        $scope.errorEmail = true;
      })
    }
  }

})

.controller('loginController', function($scope, factoryRegister) {


})

  .directive('confirmPwd', function($interpolate, $parse) {
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
