describe('editMarkingCtrl', function(){
  var $controller;
  var $scope;
  var $httpBackend;
  var URL;
  var $rootScope;

  beforeEach(module('starter'));

  beforeEach(inject(function(_$controller_, _$rootScope_, _$httpBackend_, 
                             _$injector_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', /\.html$/).respond('');
    URL = _$injector_.get('URL');
  }));

  beforeEach(function(){
    var controller = $controller('editMarkingCtrl', {$scope: $scope});
  });

  var marking = "some marking";
  var error = "some error";
  var modalEditMarking = {
    show: function() {return 'shown'},
    hide: function() {return 'hid'}
  };
  var content = [{
    "id_tipo_incidente":1,
    "tipo_incidente":"Lixo acumulado em margens de rios e lagoas",
    "tipo_incidente_ordem":1,
    "tipo_incidente_publicado":true,
    "tipo_incidente_usuario":"Rodrigo",
    "tipo_incidente_adicionado_em":"2016-08-09T01:55:44.000Z"
  },
  {
    "id_tipo_incidente":2,
    "tipo_incidente":"Lixo acumulado em vias públicas",
    "tipo_incidente_ordem":2,
    "tipo_incidente_publicado":true,
    "tipo_incidente_usuario":"Rodrigo",
    "tipo_incidente_adicionado_em":"2016-08-09T01:56:21.000Z"
  },
  {
    "id_tipo_incidente":3,
    "tipo_incidente":"Lixo incorreto em caçambas de entulho",
    "tipo_incidente_ordem":3,
    "tipo_incidente_publicado":true,
    "tipo_incidente_usuario":"Rodrigo",
    "tipo_incidente_adicionado_em":"2016-08-09T01:56:43.000Z"
  }];


  it('should store in scope the tipo_incidente types from database', function(){
    $httpBackend.expectGET(URL + '/marking_types').respond(200, content);
    $httpBackend.flush();
    expect($rootScope.marking_types).toEqual(content);
  });

  it('should do nothing on connection error while getting types', function(){
    $httpBackend.expectGET(URL + '/marking_types').respond(400);
    $httpBackend.flush();
  });

  it('should hide modal when successfully saving an incident', function(){
    spyOn(modalEditMarking, 'hide');
    $httpBackend.expectGET(URL + '/marking_types').respond(200, content);
    $httpBackend.expectPOST(URL + '/markings/edit').respond(200);
    $scope.confirmEditMarking(marking, modalEditMarking);
    $httpBackend.flush();
    expect(modalEditMarking.hide).toHaveBeenCalled();
  });

  it('should do nothing on connection error while saving marking', function(){
    spyOn(modalEditMarking, 'hide');
    $httpBackend.expectGET(URL + '/marking_types').respond(200);
    $httpBackend.expectPOST(URL + '/markings/edit').respond(400, error  );
    $scope.confirmEditMarking(marking, modalEditMarking);
    $httpBackend.flush();
    expect(modalEditMarking.hide).not.toHaveBeenCalled(); 
  });

});