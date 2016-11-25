angular.module("app.controllers")

.controller("editPevCtrl", function($scope, $http, factoryEditPEV, $state, $rootScope, $ionicPopup,findPevService, URL, $ionicLoading){
	//Function that update scope variables
	var index;
	//Function that send changes to backend
	$scope.confirmEditPEV = function(pev, modalEditPev) {
			$ionicPopup.confirm({
			title: 'Edição da PEV',
			template: 'Deseja finalizar a edição desta PEV?'
		})

   	.then(function(res) {
			$ionicLoading.show({
				template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
			});
			if(res) {
        pev.photo_link = $scope.imgURI;
				factoryEditPEV.save(pev, function(result){
            index = findPevService.getIndex();
            $rootScope.pevs[index] = result;
						var alertPopup = $ionicPopup.alert({
  						title: 'PEV editada com sucesso',
  						template: 'Obrigado por contribuir!'
						});
            modalEditPev.hide();
            $ionicLoading.hide();
					}, function(erro){
						console.log(erro);
					})
			} else {
			$ionicLoading.hide();
			console.log('não');
			}
		});
	};

   $scope.updatephoto = function () {
    $scope.pev.photo_link = $scope.imgURI;
  };
})

