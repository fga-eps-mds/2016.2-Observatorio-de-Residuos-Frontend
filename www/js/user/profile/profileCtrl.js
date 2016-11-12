angular.module('app.controllers')

    .controller('profileCtrl', function(currentUserService, $scope){
        //Function that get current user data.
        $scope.user = currentUserService.getUserData()
        console.log($scope.user)
    })

