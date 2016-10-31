angular.module('starter')

.controller('showMarkingCtrl',function($scope, $ionicModal){
	$scope.showPev = function(event, pev){
		$scope.marking = pev;
		console.log($scope);
		$scope.types = [];
		if (pev.paper == true)
			$scope.types.push("Papel");
		if (pev.glass == true)
			$scope.types.push("Vidro");
		if (pev.metal == true)
			$scope.types.push("Metal");
		if (pev.plastic == true)
			$scope.types.push("Plástico");
		console.log(pev)
		console.log($scope.types)
		$scope.modal.show();
	};
	$ionicModal.fromTemplateUrl('views/marking/showMarking.html', {
		scope: $scope,
	}).then(function(modal){
		$scope.modal = modal;
	});
});