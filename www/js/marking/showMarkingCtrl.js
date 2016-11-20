angular.module('starter')

//Modal Controller thar show informations of clicked marking
.controller('showMarkingCtrl',function($scope,$http,URL, $rootScope, 
										currentMarkingService, $ionicModal, 
										currentUserService, $state, factoryEvaluateIncidents, 
										factoryEvaluatePev){
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
	
	$scope.evaluate = function(marking, evaluation) { 
		// trocar o "paper" quando mudar o banco
		if (angular.isDefined(marking.paper)){		
		    var index = $rootScope.pevs.indexOf(marking); 
		    if (evaluation){
		    	$rootScope.pevs[index].likes += 1;	
		    	$scope.buttonClicked = false;
		    } else {
		    	$rootScope.pevs[index].dislikes += 1;	
		    	$scope.buttonClicked = false;
		    }
		    console.log($rootScope.pevs[index])
			factoryEvaluatePev.save($rootScope.pevs[index], function(result){
				console.log(result)
			}, function(error){
				console.log(error)
			});
		} else {
		    var index = $rootScope.markings.indexOf(marking); 
		    if (evaluation){
		    	$rootScope.markings[index].likes += 1;	
		    	$scope.buttonClicked = false;
		    } else {
		    	$rootScope.markings[index].dislikes += 1;
		    	$scope.buttonClicked = false;	
		    }
		    console.log($rootScope.markings[index])
			factoryEvaluateIncidents.save($rootScope.markings[index], function(result){
				console.log(result)
			}, function(error){
				console.log(error)
			});
		}
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

