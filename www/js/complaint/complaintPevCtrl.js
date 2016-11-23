angular.module('starter')

//Controller to make a complaint about PEV.
.controller('complaintPevCtrl', function($scope, $rootScope, $http, currentPEVservice, currentUserService, factoryComplaintPEV, $ionicPopup, $state){
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
			  factoryComplaintPEV.save(complaintPev, function(result){
					var alertPopup = $ionicPopup.alert({
  					title: 'PEV denunciado com sucesso',
  					template: 'Obrigado por contribuir!'
					});
          $state.go("tabs.map")
				}, function(erro){
					console.log(erro);
				})
			} else {
			console.log('não');
			}
		});
	};
});
