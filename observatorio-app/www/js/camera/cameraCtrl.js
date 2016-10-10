angular.module('app.controllers')

  .controller("cameraCtrl", function ($scope, $cordovaCamera) {
    /* That is the camera's controller, the following methods are for take a picture or choose one from gallery
This can be refactored to only had one method, changing the sourceType to ../.CAMERA or ../.PHOTOLIBRARY*/

  $scope.imgURI = "http://placehold.it/800x600";

  $scope.takePhoto = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 800,
      targetHeight: 600,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function (err) {
      console.log("Erro 1 - Camera - Verificar o erro encontrado");
    });
  };

  $scope.choosePhoto = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 800,
      targetHeight: 600,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function (err) {
      console.log("Erro 2 - Camera - Verificar o erro encontrado");
    });
  };
});
