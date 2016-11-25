angular.module('starter')

//Controller to make a complaint about Marking.
.controller('complaintMarkingCtrl', function($scope, $rootScope, $http, currentMarkingService, currentUserService, factoryComplaintMarking, $ionicPopup, $state, $ionicLoading){
  $scope.confirmComplaint = function(complaint) {
			$ionicPopup.confirm({
			title: 'Adicionar denúncia',
			template: 'Deseja finalizar denúncia?'
		})

   	.then(function(res) {
			$ionicLoading.show({
				template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
			});
			if(res) {
        complaint.author = currentUserService.getUserData().email;
        complaint.id_marking = currentMarkingService.getMarking().id_incidente;
			  factoryComplaintMarking.save(complaint, function(result){
					var alertPopup = $ionicPopup.alert({
  					title: 'Incidente denunciado com sucesso',
  					template: 'Obrigado por contribuir!'
					});
					$ionicLoading.hide();
          $state.go("tabs.map")
				}, function(erro){
					$ionicLoading.hide();
					console.log(erro);
				})
			} else {
				$ionicLoading.hide();
				console.log('não');
			}
		});
	};
});
