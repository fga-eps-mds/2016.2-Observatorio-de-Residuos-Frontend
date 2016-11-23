angular.module('starter')

    //Camera and library controller
    .controller('cameraCtrl', function($scope, $ionicPlatform, $sce, $ionicActionSheet, ImageService, FileService) {

      $ionicPlatform.ready(function() {
        $scope.images = FileService.images();
      });

      $sce.trustAsResourceUrl = function(imageName) {
        var trueOrigin = cordova.file.dataDirectory + imageName;
        return trueOrigin;
      }

      $scope.addMedia = function() {
        $scope.hideSheet = $ionicActionSheet.show({
          buttons: [
            { text: 'Tirar foto' },
            { text: 'Pegar imagem' }
          ],
          titleText: 'Adicionar imagem',
          cancelText: 'Cancelar',
          buttonClicked: function(index) {
            $scope.addImage(index);
          }
        });
      }

      $scope.addImage = function(type) {
        $scope.hideSheet();
        ImageService.handleMediaDialog(type).then(function() {
        });
      }
    });