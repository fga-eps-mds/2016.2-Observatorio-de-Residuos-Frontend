describe('pevsCtrl', function() {
  var $controller;
  var $scope;
  var $rootScope;
  var $httpBackend;
  var $state;
  var pevService;
  var currentUserService;
  var URL;
  var NgMap;

  var map = {
      lat: function() {return "0"},
      lng: function() {return "0"}
  }
  var sucesso = function(map) {
      return map;
  };
  var error = {message:"AMOEDO LENDÁRIO"}
  beforeEach(function() {
      module('starter');
      module(function($provide) {
          $provide.value('NgMap', {
              getGeoLocation: function() {
                  return {
                      then: function(sucesso,error){
                        sucesso(map);
                        error(error);
                      }
                  }
              }
         })
     });
  });
  beforeEach(inject(function(_$controller_, _$rootScope_, _currentUserService_,
    _$httpBackend_, _$injector_, _pevService_, _$state_, _NgMap_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    NgMap = _NgMap_
    $scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    $state = _$state_;
    $httpBackend.when('GET', /\.html$/).respond('');
    currentUserService = _currentUserService_;
    URL = _$injector_.get('URL');
    pevService = _pevService_;
  }));

  var user = {
    "nome_completo": "Lucas Amoêdo",
    "email": "lucas.advc@email.com"
  };
  var pevs = [{
      "id_pev": 1,
      "titulo_pev": "Amoedo's Pev",
      "paper": true,
      "metal": false,
      "plastic": true,
      "glass": false,
      "descricao_pev": "PEV do Amoedo, recolhendo felicidade",
      "latitude": "-0.0002333",
      "longitude":"0.00000671"
    },{
      "id_pev": 2,
      "titulo_pev": "Amoedo's Pev",
      "paper": true,
      "metal": true,
      "plastic": true,
      "glass": true,
      "descricao_pev": "PEV do Amoedo, recolhendo em franquias sua felicidade",
      "latitude": "-0.0002333",
      "longitude":"0.00000671"
    },{
      "id_pev": 3,
      "titulo_pev": "Amoedo's Pev",
      "paper": false,
      "metal": false,
      "plastic": false,
      "glass": false,
      "descricao_pev": "PEV do Amoedo, sempre expandindo a nossa alegria",
      "latitude": "23",
      "longitude":"-42"
    }];

  var pev = pevs[0];

  beforeEach(function() {
    currentUserService.setUserData(user);
    spyOn(currentUserService, 'getUserData').and.callThrough();
    var controller = $controller('pevsCtrl', {$scope: $scope});
  });
  it("should store the current user's email in scope", function() {
    expect(currentUserService.getUserData).toHaveBeenCalled();
    expect($scope.currentUserEmail).toEqual(user.email);
  })
  it('should get the application pevs and calculate the nearby based on latitude and longitude', function() {
    $rootScope.nearbyPevs = []
    $httpBackend.expectGET(URL + '/pevs').respond(200, pevs);
    $httpBackend.flush();
    expect($rootScope.nearbyPevs[0]).toEqual(pevs[0]);
    expect($rootScope.nearbyPevs[1]).toEqual(pevs[1]);
    expect($rootScope.nearbyPevs[2]).not.toEqual(pevs[2]);
  });
  it('should do nothing when failed to get pevs', function() {
    $rootScope.pevs = []
    $httpBackend.expectGET(URL + '/pevs').respond(400);
    $httpBackend.flush();
    expect($rootScope.pevs).toEqual([]);
  })
  it("should set the pev in service and open it's detail page when opening\
    a pev", function() {
    spyOn(pevService, 'setPev');
    spyOn($state, 'go');
    $scope.openPev(pev);
    expect(pevService.setPev).toHaveBeenCalledWith(pev);
    expect($state.go).toHaveBeenCalledWith('tabs.markings.detailPev');
  });
});
