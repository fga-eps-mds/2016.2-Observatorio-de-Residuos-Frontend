describe('newMarkingCtrl', function() {
  var $controller;
  var $httpBackend;
  var $scope = {};
  var factoryMarking;
  var URL;

  beforeEach(module('starter'));

  // beforeEach(function() {
  //   module('starter');
  //   module(function ($provide) {
  //    $provide.value('navigator', {
  //      geolocation:{
  //        getCurrentPosition: function (pos) {
  //          return pos({coords:{latitude: -15.100, longitude: -10.100}});
  //        }
  //      }
  //      //'navigator.geolocation.getCurrentPosition'
  //    })
  //   })
  // });

  beforeEach(inject(function(_$controller_, _$httpBackend_, $injector, 
                             _factoryMarking_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', /\.html$/).respond('');
    URL = $injector.get('URL');
    factoryMarking = _factoryMarking_;
  }));

  beforeEach(function() {
    var controller = $controller('newMarkingCtrl', {$scope: $scope});
  });

  describe('registerMarking', function () {
    var marking = {name:'Fire in the Hole', fire:true, water:true, earth:true, air:true, comment:'Apenas um comentário', latitude:'-50.2153', longitude:'100.2141'}
    it ('should create a new marking and push to database', function () {
      $httpBackend.expectGET(URL + '/markings').respond(200);
      $httpBackend.expectPOST(URL + '/markings/create', marking).respond(201);
      $scope.registerMarking(marking);
      navigator.geolocation.getCurrentPosition();
      $httpBackend.flush();
      expect($scope.marking).toEqual({});
    });

    it ('should not create a new marking and not push to database', function () {
      var data = "error message";
      $httpBackend.expectGET(URL + '/markings').respond(400);
      $httpBackend.expectPOST(URL + '/markings/create', marking).respond(400, data);
      $scope.registerMarking(marking);
      $httpBackend.flush();
    });
  });




  // it('should get markings from the database on a successful server response',
  //     function() {
  //   var markings = [{lat: -20, long: 20}, {lat: 30, long: -30}];
  //   $httpBackend.expectGET(URL + '/markings').respond(200, markings);
  //   $httpBackend.flush();
  //   expect($scope.markings).toEqual(markings);
  // });
  //
  // it('should get an error data on a failed server response', function() {
  //   var data = "error message";
  //   $httpBackend.expectGET(URL + '/markings').respond(400, data);
  //   $httpBackend.flush();
  // });
  //
  // it('should redirect to menu.home on a successful server response when saving\
  //   a marking', function() {
  //     var marking = {lat: 30, long: 30};
  //     $httpBackend.expectGET(URL + '/markings').respond(200);
  //     $httpBackend.expectPOST(URL + '/markings/create').respond(201);
  //     spyOn($state, 'go');
  //     $scope.registerMarking(marking);
  //     $httpBackend.flush();
  //     expect($state.go).toHaveBeenCalledWith('menu.home');
  //   });


});