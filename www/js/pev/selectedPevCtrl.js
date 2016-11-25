angular.module('app.controllers')

//Controller responsible for pevs in to contribuindo
    .controller('selectedPevCtrl', function($scope, $http, URL, $rootScope, pevService, $state) {
        $scope.selected_pev = pevService.getPev();

    })
