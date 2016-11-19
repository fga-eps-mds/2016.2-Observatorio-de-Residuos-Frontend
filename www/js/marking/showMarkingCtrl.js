angular.module('starter')
//Modal Controller thar show informations of clicked marking
.controller('showMarkingCtrl',function($scope,$http,URL, $rootScope, currentMarkingService, $ionicModal, currentUserService, $state){
	var currentMarking = "";
	//Function that places scope like informations of clicked PEV
	$scope.showPev = function(event, pev){
		$scope.currentUserEmail = currentUserService.getUserData().email;
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
		$http.get(URL+'/marking_types/'+incident.id_tipo_incidente)
		.success(function(marking_type){
			$scope.types.push(marking_type.tipo_incidente);
		})
		.error(function(){
			$scope.types.push("Não definido");
		})
		$scope.currentUserEmail = currentUserService.getUserData().email;
		$scope.marking = incident;
		$scope.modal.show();
	};

	//Transition function of pages. Can redirect to edition of PEV or edition of markings
	$scope.editMarking = function(marking){
		$scope.modal.hide();
		// trocar o "paper" quando mudar o banco
		if(angular.isDefined(marking.paper)){
			$scope.pev = marking;
			$scope.modalEditPev.show();
		} else {
			currentMarkingService.setMarking(marking);
			$scope.modalEditMarking.show();
		}
	};

	$scope.complaintMarking = function(marking){
		currentMarkingService.setMarking(marking);
		$scope.modal.hide();
		$state.go('complaint');
	};

	$ionicModal.fromTemplateUrl('views/marking/showMarking.html', {
		scope: $scope
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
