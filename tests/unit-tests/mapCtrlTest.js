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

});
