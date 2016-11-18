angular.module('starter')

.controller('complaintCtrl', function($scope, $rootScope, $http, currentUserService, factoryComplaint, $ionicPopup, $state){
  $scope.confirmComplaint = function(complaint) {
			$ionicPopup.confirm({
			title: 'Adicionar denúncia',
			template: 'Deseja finalizar denúncia?'
		})

   	.then(function(res) {
			if(res) {
        $scope.author = currentUserService.getUserData().email;
			  factoryComplaint.save(complaint, function(result){
					var alertPopup = $ionicPopup.alert({
  					title: 'Marcação denunciada com sucesso',
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
