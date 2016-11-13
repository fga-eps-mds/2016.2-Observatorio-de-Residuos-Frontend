angular.module('app.controllers')

    .controller('editProfileCtrl', function($scope, $http, URL, $rootScope, currentUserService, factoryProfile, $state) {
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
        $scope.user = currentUserService.getUserData()
        $scope.editUser = function (user) {
            factoryProfile.save(user, function (result) {
                currentUserService.setUserData(user)
                $state.go('tabs.profile')
            }, function (error) {
                console.log(error)
            })
        }
    })
