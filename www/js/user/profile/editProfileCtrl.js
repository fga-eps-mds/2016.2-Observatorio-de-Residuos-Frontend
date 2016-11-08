angular.module('app.controllers')

    .controller('editProfileCtrl', function($scope, currentUserService, factoryProfile, $state) {
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
