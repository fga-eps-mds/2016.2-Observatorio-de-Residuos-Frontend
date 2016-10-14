describe('markingCtrl', function() {
  var $controller;
  var $httpBackend;
  var $scope = {};
  var factoryMarking;
  var $state;
  var URL;

  beforeEach(module('starter'));

  beforeEach(inject(function(_$controller_, _$httpBackend_, $injector, 
                             _factoryMarking_, _$state_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', /\.html$/).respond('');
    URL = $injector.get('URL');
    factoryMarking = _factoryMarking_;
    $state = _$state_;
  }));

  beforeEach(function() {
    var controller = $controller('markingCtrl', {$scope: $scope});
  });

  it('should get markings from the database on a successful server response', 
      function() {
    var markings = [{lat: -20, long: 20}, {lat: 30, long: -30}];
    $httpBackend.expectGET(URL + '/markings').respond(200, markings);
    $httpBackend.flush();
    expect($scope.markings).toEqual(markings);
  });

  it('should get an error data on a failed server response', function() {
    var data = "error message";
    $httpBackend.expectGET(URL + '/markings').respond(400, data);
    $httpBackend.flush();
  });

  it('should redirect to menu.home on a successful server response when saving\
    a marking', function() {
      var marking = {lat: 30, long: 30};
      $httpBackend.expectGET(URL + '/markings').respond(200);
      $httpBackend.expectPOST(URL + '/markings/create').respond(201);
      spyOn($state, 'go');
      $scope.registerMarking(marking);
      $httpBackend.flush();
      expect($state.go).toHaveBeenCalledWith('menu.home');
    });


});