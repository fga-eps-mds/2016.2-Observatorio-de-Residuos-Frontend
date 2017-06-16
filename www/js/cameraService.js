angular.module('starter')

  .service("cameraService", function ($q) {

    var getPicture = function () {

      var options = {
        destinationType: Camera.DestinationType.DATA_URL
      };

      return $q(function (resolve, reject) {
        navigator.camera.getPicture(function (imageData) {
          resolve("data:image/jpeg;base64," + imageData);
        }, function (error) {
          reject(error);
        }, options)
      });

    };

    var choosePhoto = function () {
      console.log('gallery');
    };

    return {
      getPicture: getPicture,
      choosePhoto: choosePhoto
    }

  });