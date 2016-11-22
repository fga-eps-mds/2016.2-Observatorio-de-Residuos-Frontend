angular.module('app.controllers')

//Controller responsible for markings in to contribuindo
    .controller('selectedMarkingCtrl', function($scope, $http, URL, $rootScope, markingService, $state) {
        $scope.selected_marking = markingService.getMarking();

    })
