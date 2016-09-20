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
function ($scope, $stateParams, $state, factoryLogin) {
  $scope.loginAttempt = function(isFormValid, user){
    if(isFormValid){
      console.log(user);
      factoryLogin.save(user, function(result){
        console.log(result);
        $state.go("menu.home")
        $scope.errorLogin = false;
      }, function(error){
        console.log("ERRO!")
        $scope.errorLogin = true;
      })
    }
  }
})

.controller('signupCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, factoryRegister, $state, $ionicLoading, $timeout) {
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
  $scope.registerFacebook = function(){

    var ref = new Firebase("dojogrupo04.firebaseio.com");

    ref.authWithOAuthPopup("facebook", function(error, authData){
      if(error){
        console.log("Failed ", error)
      }
      else{
          $scope.user = authData;
          console.log($scope.user);
          $scope.user.first_name = authData.facebook.cachedUserProfile.first_name;
          $scope.user.last_name = authData.facebook.cachedUserProfile.last_name;
          $scope.user.gender = authData.facebook.cachedUserProfile.gender;
          $scope.user.profile_type = "cidadao";
          $scope.user.email = authData.facebook.email;

          console.log($scope.user);

          $ionicLoading.show({
          template: 'Recebendo suas informações... <ion-spinner icon="android"></ion-spinner>'
          });
          $timeout(function(){
            $ionicLoading.hide();
          },10000);
          //$state.go('menu.home');
      }
    })

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
