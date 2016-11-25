describe('markingsCtrl', function() {
  var $controller;
  var $scope;
  var $rootScope;
  var $httpBackend;
  var $state;
  var markingService;
  var currentUserService;
  var URL;

  beforeEach(module('starter'));

  beforeEach(inject(function(_$controller_, _$rootScope_, _currentUserService_,
    _$httpBackend_, _$injector_, _markingService_, _$state_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    $state = _$state_;
    $httpBackend.when('GET', /\.html$/).respond('');
    currentUserService = _currentUserService_;
    URL = _$injector_.get('URL');
    markingService = _markingService_;
  }));

  var user = {
    "nome_completo": "Lucas Amoêdo",
    "email": "lucas.advc@email.com"
  };

  var marking_types = [
    {
      "id_tipo_incidente":1,
      "tipo_incidente":"Lixo acumulado em margens de rios e lagoas"
    },
    {
      "id_tipo_incidente":2,
      "tipo_incidente":"Lixo acumulado em vias públicas"
    },
    {
      "id_tipo_incidente":3,
      "tipo_incidente":"Lixo incorreto em caçambas de entulho"
    }
  ];

  var markings = [
    {
      "id_incidente": 1,
      "titulo_incidente": "Incidente 1",
      "id_tipo_incidente": 3
    },
    {
      "id_incidente": 2,
      "titulo_incidente": "Incidente 2",
      "id_tipo_incidente": 2
    },
    {
      "id_incidente": 3,
      "titulo_incidente": "Incidente 3",
      "id_tipo_incidente": 1
    }
  ];

  var marking = markings[0];

  beforeEach(function() {
    currentUserService.setUserData(user);
    spyOn(currentUserService, 'getUserData').and.callThrough();
    var controller = $controller('markingsCtrl', {$scope: $scope});
  });

  it("should store the current user's email in scope", function() {
    expect(currentUserService.getUserData).toHaveBeenCalled();
    expect($scope.currentUserEmail).toEqual(user.email);
  })

  it('should associate the marking types to the markings based on their ids', function() {
    $rootScope.markings = []
    $httpBackend.expectGET(URL + '/marking_types').respond(200, marking_types);
    $httpBackend.expectGET(URL + '/markings').respond(200, markings);
    $httpBackend.flush();
    expect($rootScope.markings[0].tipo_incidente).toEqual(marking_types[2].tipo_incidente);
    expect($rootScope.markings[1].tipo_incidente).toEqual(marking_types[1].tipo_incidente);
    expect($rootScope.markings[2].tipo_incidente).toEqual(marking_types[0].tipo_incidente);
  });

  it('should do nothing when failing to get markings', function() {
    $rootScope.markings = []
    $httpBackend.expectGET(URL + '/marking_types').respond(200, marking_types);
    $httpBackend.expectGET(URL + '/markings').respond(400);
    $httpBackend.flush();
    expect($rootScope.markings).toEqual([]);
  });

  it('should do nothing when failing to get marking types', function() {
    $rootScope.markings = []
    $httpBackend.expectGET(URL + '/marking_types').respond(400);
    $httpBackend.flush();
    expect($rootScope.markings).toEqual([]);
  });

  it("should set the marking in service and open it's detail page when opening\
    a marking", function() {
    spyOn(markingService, 'setMarking');
    spyOn($state, 'go');
    $scope.openMarking(marking);
    expect(markingService.setMarking).toHaveBeenCalledWith(marking);
    expect($state.go).toHaveBeenCalledWith('tabs.markings.detailMarking');

  });

});