angular.module('starter')

.controller('showMarkingCtrl',function($scope, $ionicModal){
	$scope.showPev = function(event, pev){
		$scope.marking = pev;
		console.log($scope);
		$scope.modal.show();
	};
		$ionicModal.fromTemplateUrl('views/marking/showMarking.html', {
			scope: $scope,
		}).then(function(modal){
			$scope.modal = modal;
		});
});