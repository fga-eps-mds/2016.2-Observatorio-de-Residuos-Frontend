angular.module('starter')

//Camera controller responsible for take photo from camera and choose photo from galery.
.controller("cameraCtrl", function($scope, $cordovaCamera) {

 $scope.takePhoto = function() {
  var options = {
   quality: 75,
   destinationType: Camera.DestinationType.DATA_URL,
   sourceType: Camera.PictureSourceType.CAMERA,
   allowEdit: true,
   encodingType: Camera.EncodingType.JPEG,
   targetWidth: 300,
   targetHeight: 300,
   popoverOptions: CameraPopoverOptions,
   saveToPhotoAlbum: true
  };

  $cordovaCamera.getPicture(options).then(function(imageData) {
   $scope.imgURI = "data:image/jpeg;base64," + imageData;
  }, function(err) {
   console.log("Image câmera error");
  });
 }

 $scope.choosePhoto = function() {
  var options = {
   quality: 75,
   destinationType: Camera.DestinationType.DATA_URL,
   sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
   allowEdit: true,
   encodingType: Camera.EncodingType.JPEG,
   targetWidth: 300,
   targetHeight: 300,
   popoverOptions: CameraPopoverOptions,
   saveToPhotoAlbum: false
  };

  $cordovaCamera.getPicture(options).then(function(imageData) {
   $scope.imgURI = "data:image/jpeg;base64," + imageData;
  }, function(err) {
   console.log("Image library error");
  });
 }
});