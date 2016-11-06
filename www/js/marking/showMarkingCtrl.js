angular.module('starter')

.controller('showMarkingCtrl',function($scope, $ionicModal, currentUserService, $state){
	$scope.showPev = function(event, pev){
		$scope.currentUserEmail = currentUserService.getUserData().email;
		console.log(pev)
		$scope.marking = pev;
		$scope.types = [];
		if (pev.paper == true)
			$scope.types.push("Papel");
		if (pev.glass == true)
			$scope.types.push("Vidro");
		if (pev.metal == true)
			$scope.types.push("Metal");
		if (pev.plastic == true)
			$scope.types.push("Plástico");
		$scope.modal.show();
	};
	$scope.showIncident = function(event, incident){
		$scope.currentUserEmail = currentUserService.getUserData().email;
		$scope.marking = incident;
		$scope.types = [];
		$scope.modal.show();
	};

	$scope.editMarking = function(marking){
		$scope.modal.hide();
		// trocar o "paper" quando mudar o banco 
		if(angular.isDefined(marking.paper)){
			$state.go('editPEV');
		} else {
			$state.go('editMarking');
			console.log(marking);
		}
	};

	$ionicModal.fromTemplateUrl('views/marking/showMarking.html', {
		scope: $scope,
	}).then(function(modal){
		$scope.modal = modal;
	});
});
