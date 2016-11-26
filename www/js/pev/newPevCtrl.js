angular.module('app.controllers')

.controller("newPevCtrl", function ($ionicHistory, NgMap,$state, $scope, $rootScope,currentUserService, factoryPEV, $ionicPopup, URL, $ionicLoading) {
  var options = {enableHighAccuracy: true};
  if(angular.isUndefined($rootScope.pevs)) {
    $rootScope.pevs = [];
  }

  $scope.createPEV = function (pev, imgURI) {
    $ionicLoading.show({
      template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
    });
    NgMap.getGeoLocation().then(function(map) {
      pev.latitude = map.lat();
      pev.longitude = map.lng();
      pev.author_email = currentUserService.getUserData().email;
      pev.total_confirmacoes_funcionando = 0;
      pev.total_confirmacoes_fechou = 0;



      var ftoptions =  new FileUploadOptions();
      ftoptions.fileKey = "file";
      ftoptions.chunkedMode = false;
      ftoptions.params = pev

      var ft = new FileTransfer();

      ft.upload(imgURI, encodeURI(URL + '/pevs/create'), function(success){
        success.response.author_email = pev.author_email;
        success.response.author_name = pev.author_name;
        $rootScope.pevs.push(success.response);
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'PEV cadastrada com sucesso',
          template: 'Obrigado por contribuir!'
        });
        $scope.pev={}
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('tabs.map')
        /* This state must be reset and the back button too */
      }, function(error){
         $ionicLoading.hide();
         var alertPopup = $ionicPopup.alert({
          title: 'Informações insuficientes',
          template: 'Preencha as informações corretamente!'
        })
      }, ftoptions);

    },function(error) {
      $ionicLoading.hide();
      alert('Unable to get location: ' + error.message);
    }, options);
  }
  $scope.updatephoto = function () {
    $scope.pev.photo_link = $scope.imgURI;
  };
});
