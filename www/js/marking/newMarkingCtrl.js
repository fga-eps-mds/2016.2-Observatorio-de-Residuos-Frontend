angular.module('app.controllers')

  .controller("newMarkingCtrl", function ($ionicHistory, currentUserService, NgMap,
    $state, $scope, $rootScope, factoryMarking, URL, $http, $ionicLoading, $ionicPopup,
    cameraService) {

    $scope.marking = {};

    var takenPicture = window.localStorage.getItem('takenPicture');
    window.localStorage.removeItem('takenPicture');

    if (takenPicture && takenPicture != 'Camera cancelled.') {
      $scope.imgURI = "data:image/jpeg;base64," + takenPicture;
    }

    var options = {
      enableHighAccuracy: true
    };

    if (angular.isUndefined($rootScope.markings)) {
      $rootScope.markings = [];
    }

    $ionicLoading.show({
      template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
    });

    $rootScope.marking_types = [];

    $http.get(URL + '/marking_types')
      .success(function (content) {
        $ionicLoading.hide();
        angular.forEach(content, function (value, key) {
          $rootScope.marking_types.push(value);
        })
      })
      .error(function (error) {
        $ionicLoading.hide();
        console.log("Error");
      })

    $scope.getPicture = function () {
      cameraService.getPicture().then(function (success) {
        $scope.imgURI = success;
      }, function (error) {
        console.log(error);
      });

    }

    $scope.choosePhoto = function () {
      console.log('choosing photo');
    }
    $scope.registerMarking = function (marking, imgURI) {

      $ionicLoading.show({
        template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
      });
      NgMap.getGeoLocation().then(function (map) {
        marking.latitude = map.lat();
        marking.longitude = map.lng();
        marking.author_email = currentUserService.getUserData().email;
        marking.total_confirmacoes_existencia = 0;
        marking.total_confirmacoes_resolvido = 0;

        var ftoptions = new FileUploadOptions();
        ftoptions.fileKey = "file";
        ftoptions.chunkedMode = false;
        ftoptions.params = marking

        var ft = new FileTransfer();

        ft.upload(imgURI, encodeURI(URL + '/markings/create'), function (success) {

          $ionicLoading.hide();
          var createdMarking = JSON.parse(success.response);
          createdMarking.author_email = marking.author_email;
          $rootScope.markings.push(createdMarking);
          var alertPopup = $ionicPopup.alert({
            title: 'Incidente cadastrado com sucesso',
            template: 'Obrigado por contribuir!'
          })

          $ionicHistory.nextViewOptions({
            disableBack: true
          })
          $state.go('tabs.map', {
            reload: true
          })

        }, function (error) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Informações insuficientes',
            template: 'Preencha as informações corretamente!'
          });

        }, ftoptions);

      }, function (error) {
        $ionicLoading.hide();
        alert('Não foi possível acessar a localização: ' + error.message);
      }, options);
    }
  });