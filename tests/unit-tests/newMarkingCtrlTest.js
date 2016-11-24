describe('newMarkingCtrl', function() {
  var $controller;
  var $httpBackend;
  var $rootScope = {};
  var $scope = {};
  var factoryMarking;
  var $ionicHistory;
  var $ionicPopup;
  var _currentUserService_;

  beforeEach(module('starter'));
  var map = {
      lat: function() {return "-30"},
      lng: function() {return "-30"}
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
  beforeEach(inject(function (_$controller_, _$httpBackend_, $injector,
    _factoryMarking_, _$ionicHistory_, _$rootScope_, _currentUserService_,
    _$ionicPopup_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    URL = $injector.get('URL');
    $httpBackend.when('GET', /\.html$/).respond('');
    factoryMarking = _factoryMarking_;
    $ionicHistory = _$ionicHistory_;
    $rootScope = _$rootScope_;
    currentUserService = _currentUserService_;
    $ionicPopup = _$ionicPopup_;
  }));

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

  beforeEach(function () {
    var controller = $controller('newMarkingCtrl', {$scope: $scope, $ionicHistory: $ionicHistory});
    var user = {id_usuario: 1, nome_completo: "Lucas Amoêdo", email: "lucas.advc@email.com"}
    currentUserService.setUserData(user);
  });


  it('should get all markings types and store them in scope', function() {
    $httpBackend.expectGET(URL + '/marking_types').respond(200, marking_types);
    $httpBackend.flush();
    expect($rootScope.marking_types).toEqual(marking_types);
  });

  it('should do nothing when failing to get marking types', function() {
    $httpBackend.expectGET(URL + '/marking_types').respond(400);
    $httpBackend.flush();
    expect($rootScope.marking_types).toEqual([]);
  });

  describe('registerMarking', function () {

    beforeEach(function() {
      $httpBackend.expectGET(URL + '/marking_types').respond(200);
    });

    var marking = {
      name: 'Fire in the Hole',
      id_marking_type: 12,
      comment: 'Apenas um comentário',
      latitude: '-50.2153',
      longitude: '100.2141'
    };

    it('should create a new marking and push to database', function () {
      var result = marking;
      spyOn($rootScope.markings, 'push');
      spyOn($ionicPopup, 'alert');
      $httpBackend.expectPOST(URL + '/markings/create', marking).respond(201, result);
      $scope.registerMarking(marking);
      $httpBackend.flush();
      expect($rootScope.markings.push).toHaveBeenCalled();
      expect($ionicPopup.alert).toHaveBeenCalledWith({
        title: 'Incidente cadastrado com sucesso',
        template: 'Obrigado por contribuir!'
      });
    });

    it('should not create a new marking and not push to database', function () {
      var data = "error message";
      spyOn($rootScope.markings, 'push');
      spyOn($ionicPopup, 'alert');
      $httpBackend.expectPOST(URL + '/markings/create', marking).respond(400, data);
      $scope.registerMarking(marking);
      $httpBackend.flush();
      expect($rootScope.markings.push).not.toHaveBeenCalled();
      expect($ionicPopup.alert).toHaveBeenCalledWith({
        title: 'Informações insuficientes',
        template: 'Preencha as informações corretamente!'
      });
    });
  });
});
