angular.module('app.controllers')

    .controller('editProfileCtrl', function($scope, $http, URL, $rootScope, currentUserService, factoryProfile, $state) {
      //Function that update scope variables
      $rootScope.profiles = [];
      $http.get(URL + '/profiles')
      .success(function(content){
        angular.forEach(content, function(value, key) {
          $rootScope.profiles.push(value);
        })
      })
      .error(function(error){
        console.log("Error");
      })
        //Function that send changes to backend
        $scope.user = currentUserService.getUserData()
        $scope.editUser = function (user) {
            factoryProfile.save(user, function (result) {
                currentUserService.setUserData(user)
                $state.go('profile')
            }, function (error) {
                console.log(error)
            })
        }
    })
