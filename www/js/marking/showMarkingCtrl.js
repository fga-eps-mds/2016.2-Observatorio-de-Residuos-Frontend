angular.module('starter')
// Controller da modal que mostra as informações da marcação clicada
.controller('showMarkingCtrl',function($scope, $rootScope, currentMarkingService, $ionicModal, currentUserService, $state){
	var currentMarking = "";
	//Função que coloca como escopo as informações da PEV clicada.
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
	//Função que coloca como escopo as informações do incidente clicado.
	$scope.showIncident = function(event, incident){
		$scope.currentUserEmail = currentUserService.getUserData().email;
		$scope.marking = incident;
		$scope.types = [];
		$scope.modal.show();
	};

	//Função de transição de páginas. Pode redirecionar para edição de PEV ou
	//edição de incidentes.
	$scope.editMarking = function(marking){
		$scope.modal.hide();
		console.log(marking);
		// trocar o "paper" quando mudar o banco
		if(angular.isDefined(marking.paper)){
			$state.go('editPEV');
		} else {
			currentMarkingService.setMarking(marking);
			$state.go('editMarking');
		}
	};

	$ionicModal.fromTemplateUrl('views/marking/showMarking.html', {
		scope: $scope,
	}).then(function(modal){
		$scope.modal = modal;
	});
});
