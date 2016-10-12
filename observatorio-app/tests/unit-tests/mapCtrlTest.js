describe('mapCtrl', function() {
  var $controller;
  var NgMap;
  var $scope = {};

  beforeEach(function() {
    module('starter');
    module(function($provide) {

      $provide.value('NgMap', {

        getMap: function() {
          return {
            then: function(map) {
              return map({
                getCenter: function(){return "center"},
                markers: "many markers",
                shapes: "many shapes"
              });
            }
          };
        }
      });
    });
  });

  beforeEach(inject(function(_$controller_, _NgMap_) {
    $controller = _$controller_;
    NgMap = _NgMap_;
  }));

  it('Should get the map', function() {
    var controller = $controller('mapCtrl', {$scope: $scope, NgMap: NgMap});
    spyOn(NgMap, 'getMap').and.callThrough();
    NgMap.getMap();
    expect(NgMap.getMap).toHaveBeenCalled();
  });

  it('should get the position of an event', function() {
    var event = {latLng: {
      lat: function(){return '-40'}, 
      lng: function(){return '30'}
    }};
    spyOn($scope, 'getPosition').and.callThrough();
    $scope.getPosition(event);
    expect($scope.getPosition).toHaveBeenCalledWith(event);
  });

});