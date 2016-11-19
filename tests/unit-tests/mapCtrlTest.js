describe('mapCtrl', function() {
  var $controller;
  var NgMap;
  var $scope = {};
  var $rootScope;
  var URL;
  var $httpBackend;

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

  beforeEach(inject(function(_$controller_, _NgMap_, _$httpBackend_, $injector, 
                             _$rootScope_) {
    $controller = _$controller_;
    NgMap = _NgMap_;
    $rootScope = _$rootScope_;
    URL = $injector.get("URL");
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', /\.html$/).respond('');
  }));

  beforeEach(function(){
    var controller = $controller('mapCtrl', {$scope: $scope, NgMap: NgMap, 
                                             $rootScope: $rootScope});
  });

  it('Should get the map and not load any pevs or markings', function() {
    spyOn(NgMap, 'getMap').and.callThrough();
    $httpBackend.expectGET(URL+"/pevs").respond(400);
    $httpBackend.expectGET(URL+"/markings").respond(400);
    NgMap.getMap();
    $httpBackend.flush();
    expect(NgMap.getMap).toHaveBeenCalled();
  });

  it('Should get the map', function() {
    var contentMarkingDB = [{
      "id_incidente":1,"titulo_incidente":"INCIDENTE",
      "descricao_incidente":"Com acentuação.","id_tipo_incidente":12,
      "imagem_incidente":"imagem","latitude":-16.079271,"longitude":-47.988983,
      "cep":null,"estado":"GO","cidade":"Luziania","bairro":null,
      "logradouro":null,"numero":null,"complemento":null,"id_usuario":1,
      "total_visualizacoes":0,"total_confirmacoes_existencia":0,
      "total_confirmacoes_resolvido":0,"total_denuncias":0,"status":null,
      "adicionado_em":"2016-11-05T20:39:22.000Z","publicado":false
    }];
    var contentPEVDB = [{
      "id_pev":5,"titulo_pev":"PEV","descricao_pev":"PEV",
      "id_tipo_pev":1,"imagem_pev":null,"latitude":-16.079239,
      "longitude":-47.989033,"cep":null,"estado":"CU","cidade":"to do pegarCidade",
      "bairro":null,"logradouro":null,"numero":null,"complemento":null,
      "id_usuario":41,"total_visualizacoes":0,"total_confirmacoes_funcionando":0,
      "total_confirmacoes_fechou":0,"total_denuncias":0,"status":null,
      "adicionado_em":"2016-11-05T10:31:15.000Z","publicado":false,"paper":true,
      "metal":false,"plastic":true,"glass":true
    }];
    var contentMarkingFormatted = { 
      id_incidente: contentMarkingDB[0].id_incidente,
      titulo_incidente: contentMarkingDB[0].titulo_incidente,
      descricao_incidente: contentMarkingDB[0].descricao_incidente,
      latitude: contentMarkingDB[0].latitude,
      longitude: contentMarkingDB[0].longitude,
      id_tipo_incidente: contentMarkingDB[0].id_tipo_incidente,
      author_name: undefined, 
      author_email: undefined 
    };
    var contentPEVFormatted = { 
      id_pev: contentPEVDB[0].id_pev,
      titulo_pev: contentPEVDB[0].titulo_pev,
      descricao_pev: contentPEVDB[0].descricao_pev,
      latitude: contentPEVDB[0].latitude,
      longitude: contentPEVDB[0].longitude,
      paper: contentPEVDB[0].paper,
      metal: contentPEVDB[0].metal,
      plastic: contentPEVDB[0].plastic,
      glass: contentPEVDB[0].glass,
      author_name: undefined, 
      author_email: undefined
    };
    spyOn(NgMap, 'getMap').and.callThrough();
    $httpBackend.expectGET(URL+"/pevs").respond(200, contentPEVDB);
    $httpBackend.expectGET(URL+"/markings").respond(200, contentMarkingDB);
    NgMap.getMap();
    $httpBackend.flush();
    expect($rootScope.pevs[0]).toEqual(contentPEVFormatted);
    expect($rootScope.markings[0]).toEqual(contentMarkingFormatted);
    expect(NgMap.getMap).toHaveBeenCalled();
  });
});
