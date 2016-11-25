angular.module('starter')

//Modal Controller thar show informations of clicked marking
.controller('showMarkingCtrl',function($scope,$http,URL, $rootScope,
										currentMarkingService, $ionicModal,
										currentUserService, currentPEVservice, $state, factoryEvaluateIncidents,
										factoryEvaluatePev, $ionicLoading){
	var index;

	//Function that places scope like informations of clicked PEV
	$scope.showPev = function(event, pev){
    $scope.marking_title = angular.copy(pev.titulo_pev);
    var seenPevs = currentUserService.getUserPevs();
		$scope.currentUserEmail = currentUserService.getUserData().email;
    $scope.voted = false;
		$scope.marking = pev;
		$scope.types = [];
		if (pev.paper === true)
			$scope.types.push("Papel");
		if (pev.glass === true)
			$scope.types.push("Vidro");
		if (pev.metal === true)
			$scope.types.push("Metal");
		if (pev.plastic === true)
			$scope.types.push("Plástico");
    angular.forEach(seenPevs, function(value) {
      if($scope.voted !== true) {
        if(pev.id_pev === value.id_pev) {
          $scope.voted = true;
        }
      }
    });
		$scope.modal.show();
	};
	//Function that places scope like informations of clicked marking
	$scope.showIncident = function(event, incident){
    $scope.marking_title = angular.copy(incident.titulo_incidente);
     index = $rootScope.markings.indexOf(incident);

    $scope.voted = false;
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
    var userMarkings = currentUserService.getUserMarking();
    angular.forEach(userMarkings, function(value) {
      if($scope.voted !== true) {
        if(incident.id_incidente === value.id_incidente) {
          $scope.voted = true;
        }
      }
    });

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
    $ionicLoading.show('Por favor, aguarde...');
		// trocar o "paper" quando mudar o banco
		if(angular.isDefined(marking.paper)) {
		  index = $rootScope.pevs.indexOf(marking);
		  if (evaluation){
		    $rootScope.pevs[index].total_confirmacoes_funcionando += 1;
		  } else {
		    $rootScope.pevs[index].total_confirmacoes_fechou += 1;
		  }
      $rootScope.pevs[index].id_usuario = currentUserService.getUserData().id_usuario;
			factoryEvaluatePev.save($rootScope.pevs[index], function(result){
        $scope.voted = true;
        $ionicLoading.hide();
        currentUserService.getUserPevs().push(result);
			}, function(error){
        $ionicLoading.hide();
				console.log(error)
			});
		} else {
		    var index = $rootScope.markings.indexOf(marking);
		    if (evaluation){
		    	$rootScope.markings[index].total_confirmacoes_existencia += 1;
		    } else {
		    	$rootScope.markings[index].total_confirmacoes_resolvido += 1;
		    }
			$rootScope.markings[index].id_usuario = currentUserService.getUserData().id_usuario;
			factoryEvaluateIncidents.save($rootScope.markings[index], function(result){
        $scope.voted = true;
        $ionicLoading.hide();
				currentUserService.getUserMarking().push(result);

			}, function(error){
        $ionicLoading.hide();
				console.log(error)
			});
		}
	};

	$scope.complaintMarking = function(marking){
		$scope.modal.hide();
		if(angular.isDefined(marking.paper)){
			$scope.pev = marking;
			currentPEVservice.setPEV($scope.pev);
			$state.go('complaintPev')
		} else {
			currentMarkingService.setMarking(marking);
			$state.go('complaintMarking');
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
