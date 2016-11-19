angular.module('starter')
//Modal Controller thar show informations of clicked marking
.controller('showMarkingCtrl',function($scope,$http,URL, $rootScope, currentMarkingService, $ionicModal, currentUserService, $state){
	var currentMarking = "";
	//Function that places scope like informations of clicked PEV
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
	//Function that places scope like informations of clicked marking
	$scope.showIncident = function(event, incident){
		$scope.types = [];
		console.log(incident);
		$http.get(URL+'/marking_types/'+incident.id_marking_type)
		.success(function(marking_type){
			$scope.types.push(marking_type.tipo_incidente);
		})
		.error(function(){
			$scope.types.push("Não definido");
		})
		$scope.currentUserEmail = currentUserService.getUserData().email;
		$scope.marking = incident;
		console.log()
		$scope.modal.show();
	};

	//Transition function of pages. Can redirect to edition of PEV or edition of markings
	$scope.editMarking = function(marking){
		$scope.modal.hide();
		console.log(marking);
		// trocar o "paper" quando mudar o banco
		if(angular.isDefined(marking.paper)){
			$scope.pev = marking;
			$scope.modalEditPev.show();
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

	$ionicModal.fromTemplateUrl('views/marking/editMarkings.html', {
		scope: $scope
	}).then(function(modal){
		$scope.modalEditMarking = modal;
	});

	$ionicModal.fromTemplateUrl('views/pev/editPEV.html', {
		scope: $scope
	}).then(function(modal){
		$scope.modalEditPev = modal;
	})
});
