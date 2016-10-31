angular.module('starter')

.controller('showMarkingCtrl',function($scope, $ionicModal){
	$scope.showPev = function(){
		console.log('PEV clicada.');
		$scope.modal.show();
	};
		$ionicModal.fromTemplateUrl('views/marking/showMarking.html', {
			scope: $scope,
		}).then(function(modal){
			$scope.modal = modal;
		});
});