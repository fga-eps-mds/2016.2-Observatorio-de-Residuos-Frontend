describe('selectedPevCtrl', function(){
  var $controller;
  var $scope = {};
  var pevService;
  beforeEach(module('starter'));
  beforeEach(inject(function(_$controller_, _pevService_){
    $controller = _$controller_;
    pevService = _pevService_
  }))
  it('loads the current pev into the scope data', function(){
    pevService.setPev("Marcação 1");
    var selectedPevCtrl = $controller('selectedPevCtrl', {$scope:$scope});
    expect($scope.selected_pev).toEqual("Marcação 1");
  })
});
