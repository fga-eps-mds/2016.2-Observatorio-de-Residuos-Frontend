describe('selectedMarkingCtrl', function(){
  var $controller;
  var $scope = {};
  var markingService;
  beforeEach(module('starter'));
  beforeEach(inject(function(_$controller_, _markingService_){
    $controller = _$controller_;
    markingService = _markingService_
  }))
  it('loads the current marking into the scope data', function(){
    markingService.setMarking("Marcação 1");
    var selectedMarkingCtrl = $controller('selectedMarkingCtrl', {$scope:$scope});
    expect($scope.selected_marking).toEqual("Marcação 1");
  })
});
