describe('showMarkingCtrl', function() {
  var $controller;
  var $ionicModal;
  var $scope = {};

  beforeEach(module('starter'));

  beforeEach(inject(function(_$controller_, _$ionicModal_) {
    $controller = _$controller_;
    $ionicModal = _$ionicModal_;
    spyOn($ionicModal, 'fromTemplateUrl').and.callFake(function() {
      return {
        then: function(modal) {return modal({show: function(){}});}
      };
    });
  }));

  beforeEach(function() {
    var controller = $controller('showMarkingCtrl', {$scope: $scope, 
                                                     $ionicModal: $ionicModal});
  });

  it('should set proper types of a pev', function() {
    var pev = {"name": "PEV", "paper": true, "plastic": false, "metal": true, 
               "glass": false}
    event = "some random event";
    spyOn($scope.modal, 'show');

    $scope.showPev(event, pev);
    expect($scope.types).toEqual(['Papel', 'Metal']);
    expect($scope.modal.show).toHaveBeenCalled();

    var anotherPev = {"name": "AnotherPEV", "paper": false, "plastic": true, 
                      "metal": false, "glass": true}
    $scope.showPev(event, anotherPev);
    expect($scope.types).toEqual(['Vidro', 'Plástico']);
    expect($scope.modal.show).toHaveBeenCalled();

  });

  it('should show an incident', function() {
    var incident = {name: "incident"};
    var event = "some event";
    spyOn($scope.modal, 'show');
    $scope.showIncident(event, incident);      
    expect($scope.marking).toEqual(incident);
    expect($scope.types).toEqual([]);
    expect($scope.modal.show).toHaveBeenCalled();

  });


});
