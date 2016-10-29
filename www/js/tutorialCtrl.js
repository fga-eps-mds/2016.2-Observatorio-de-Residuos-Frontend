angular.module('app.controllers')

    .controller('tutorialCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
        $scope.startApp = function() {
            $state.go('tabs.map');
        };
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };
    });