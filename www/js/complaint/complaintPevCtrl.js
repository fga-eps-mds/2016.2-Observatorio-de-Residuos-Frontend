angular.module('starter')

.controller('complaintPevCtrl', function($scope, $rootScope, $http, currentPEVservice, currentUserService, factoryComplaintPEV, $ionicPopup, $state, $ionicLoading){
  $scope.confirmComplaint = function(complaintPev) {
			$ionicPopup.confirm({
			title: 'Adicionar denúncia',
			template: 'Deseja finalizar denúncia?'
		})

   	.then(function(res) {
			if(res) {
        complaintPev.author = currentUserService.getUserData().email;
        complaintPev.id_pev = currentPEVservice.getPEV().id_pev;
        console.log(complaintPev.id_pev);
			$ionicLoading.show({
				template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
			});
			  factoryComplaintPEV.save(complaintPev, function(result){
					var alertPopup = $ionicPopup.alert({
  					title: 'PEV denunciado com sucesso',
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
