angular.module('starter')

    .controller('cameraCtrl', function($scope, $cordovaDevice, $cordovaFile, $ionicPlatform, $cordovaEmailComposer, $ionicActionSheet, ImageService, FileService) {

      $ionicPlatform.ready(function() {
        $scope.images = FileService.images();
      });

      $scope.urlForImage = function(imageName) {
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
          $scope.$apply();
        });
      }

      $scope.sendEmail = function() {
        if ($scope.images != null && $scope.images.length > 0) {
          var mailImages = [];
          var savedImages = $scope.images;
          if ($cordovaDevice.getPlatform() == 'Android') {
            // Currently only working for one image..
            var imageUrl = $scope.urlForImage(savedImages[0]);
            var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
            var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
            $cordovaFile.copyFile(namePath, name, cordova.file.externalRootDirectory, name)
                .then(function(info) {
                  mailImages.push('' + cordova.file.externalRootDirectory + name);
                  $scope.openMailComposer(mailImages);
                }, function(e) {
                  reject();
                });
          } else {
            for (var i = 0; i < savedImages.length; i++) {
              mailImages.push('' + $scope.urlForImage(savedImages[i]));
            }
            $scope.openMailComposer(mailImages);
          }
        }
      }

      $scope.openMailComposer = function(attachments) {
        var bodyText = '<html><h2>My Images</h2></html>';
        var email = {
          to: 'some@email.com',
          attachments: attachments,
          subject: 'Devdactic Images',
          body: bodyText,
          isHtml: true
        };

        $cordovaEmailComposer.open(email).then(null, function() {
          for (var i = 0; i < attachments.length; i++) {
            var name = attachments[i].substr(attachments[i].lastIndexOf('/') + 1);
            $cordovaFile.removeFile(cordova.file.externalRootDirectory, name);
          }
        });
      }
    });