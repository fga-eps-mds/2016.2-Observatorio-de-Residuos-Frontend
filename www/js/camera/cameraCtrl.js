angular.module('app.controllers')

  .controller("cameraCtrl", function ($scope, $cordovaCamera) {
    /* That is the camera's controller, the following methods are to take a picture or choose one from gallery*/

  $scope.imgURI = "http://placehold.it/800x600";

  $scope.takePhoto = function (srcType) {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: (srcType=="CAMERA")?Camera.PictureSourceType.CAMERA:Camera.PictureSourceType.PHOTOLIBRARY,
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
      console.log("Erro Camera - Verificar o erro encontrado");
    });
  };
});
