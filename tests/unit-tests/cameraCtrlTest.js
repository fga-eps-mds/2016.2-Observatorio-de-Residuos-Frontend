describe('cameraCtrl', function(){
  var $controller;
  var $scope = {};
  var $cordovaCamera;
  beforeEach(function(){
      module("starter");
  });
  beforeEach(inject(function(_$controller_, _$cordovaCamera_){
    $controller = _$controller_;
    $cordovaCamera = _$cordovaCamera_;
  }))
  it('should take a foto from camera input', function(){
    var src = "CAMERA";
    var controller = $controller('cameraCtrl', {$scope: $scope, $cordovaCamera: $cordovaCamera});
    //spyOn('Camera');
    //$scope.takePhoto(src);
  })
})
