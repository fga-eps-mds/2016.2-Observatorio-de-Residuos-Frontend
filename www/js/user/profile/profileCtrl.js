angular.module('app.controllers')

    .controller('profileCtrl', function(currentUserService, $scope){
        $scope.user = currentUserService.getUserData()
        console.log($scope.user)
    })

