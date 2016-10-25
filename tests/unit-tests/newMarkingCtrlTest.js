describe('newMarkingCtrl', function() {
  var $controller;
  var $httpBackend;
  var $rootScope = {};
  var $scope = {};
  var factoryMarking;
  var $ionicHistory;

  beforeEach(module('starter'));
  beforeEach(function () {
    module('starter');
    module(function ($provide) {
      $provide.value('NgMap', {
        getGeoLocation: function () {
          return {
            then: function (map) {
              return map({
                lat: function () {
                  return "-30"
                },
                lng: function () {
                  return "-30"
                }
              })
            }
          }
        }
      });
    });
  });

  beforeEach(inject(function (_$controller_, _$httpBackend_, $injector, _factoryMarking_, _$ionicHistory_, _$rootScope_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    URL = $injector.get('URL');
    $httpBackend.when('GET', /\.html$/).respond('');
    factoryMarking = _factoryMarking_;
    $ionicHistory = _$ionicHistory_;
    $rootScope = _$rootScope_;
  }))

  beforeEach(function () {
    var controller = $controller('newMarkingCtrl', {$scope: $scope, $ionicHistory: $ionicHistory});
  });

  describe('registerMarking', function () {
    var marking = {
      name: 'Fire in the Hole',
      fire: true,
      water: true,
      earth: true,
      air: true,
      comment: 'Apenas um comentário',
      latitude: '-50.2153',
      longitude: '100.2141'
    }
    it('should create a new marking and push to database', function () {
      $httpBackend.expectPOST(URL + '/markings/create', marking).respond(201);
      $scope.registerMarking(marking);
      $httpBackend.flush();
      expect($scope.marking).toBeUndefined();
      //expect($scope.marking).toEqual({});
    });

    it('should not create a new marking and not push to database', function () {
      var data = "error message";
      $httpBackend.expectPOST(URL + '/markings/create', marking).respond(400, data);
      $scope.registerMarking(marking);
      $httpBackend.flush();
    });
  });
});