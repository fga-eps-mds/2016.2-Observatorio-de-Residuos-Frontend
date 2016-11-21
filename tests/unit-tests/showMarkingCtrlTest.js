describe('showMarkingCtrl', function() {
  var $controller;
  var $ionicModal;
  var $scope = {};
  var currentUserService;
  var $state = {};
  var $httpBackend;
  var URL;
  var $rootScope;
  var factoryEvaluateIncidents;
  var factoryEvaluatePev;

  beforeEach(module('starter'));

  beforeEach(inject(function(_$controller_, _$state_, _$ionicModal_, 
                             _currentUserService_, _$httpBackend_, $injector, _$rootScope_,
                             _factoryEvaluateIncidents_, _factoryEvaluatePev_) {
    $controller = _$controller_;
    $ionicModal = _$ionicModal_;
    $state = _$state_;
    currentUserService = _currentUserService_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    factoryEvaluateIncidents = _factoryEvaluateIncidents_;
    factoryEvaluatePev = _factoryEvaluatePev_;
    $httpBackend.when('GET', /\.html$/).respond('');
    URL = $injector.get('URL');
    spyOn($ionicModal, 'fromTemplateUrl').and.callFake(function() {
      return {
        then: function(modal) {
          return modal(
            {
              show: function(){}, 
              hide: function(){}
            }
          );
        }
      };
    });
  }));

  beforeEach(function() {
    var controller = $controller('showMarkingCtrl', 
                                  {
                                    $scope: $scope,
                                    $ionicModal: $ionicModal,
                                    currentUserService: currentUserService,
                                    $rootScope: $rootScope
                                  });
  });

  var pev = {"titulo_pev": "PEV", "paper": true, "plastic": false, "metal": true, 
               "glass": false, "likes": 0, "dislikes": 0};
  var event = "some random event";
  var anotherPev = {"titulo_pev": "AnotherPEV", "paper": false, "plastic": true,
                      "metal": false, "glass": true};
  var incident = {"titulo_incidente": "incidente", "id_tipo_incidente": 1}
  var marking_type = {"tipo_incidente": "desastre"};
  var pevs = [pev];

  it('should set proper types of a pev', function() {
    spyOn($scope.modal, 'show');

    $scope.showPev(event, pev);
    expect($scope.types).toEqual(['Papel', 'Metal']);
    expect($scope.modal.show).toHaveBeenCalled();

    $scope.showPev(event, anotherPev);
    expect($scope.types).toEqual(['Vidro', 'Plástico']);
    expect($scope.modal.show).toHaveBeenCalled();
  });

  it('should set proper types of a marking', function() {
    
    $scope.showIncident(event, incident);
    $httpBackend.expectGET(URL + '/marking_types/' + incident.id_tipo_incidente)
    .respond(200, marking_type);
    $httpBackend.flush();
    expect($scope.types).toEqual(['desastre']);
  });

  it('should show undefined message when failing to get marking \
    types', function() {
      $httpBackend.expectGET(URL + '/marking_types/' + incident.id_tipo_incidente)
    .respond(400);
      $scope.showIncident(event, incident);
      $httpBackend.flush();
      expect($scope.types).toEqual(['Não definido']);
  })

  it('should show an incident or pev', function() {
    spyOn($scope.modal, 'show');
    $scope.showIncident(event, incident);
    expect($scope.marking).toEqual(incident);
    expect($scope.types).toEqual([]);
    expect($scope.modal.show).toHaveBeenCalled();
  });

  it('should call edit pev if it has a pev as parameter', function() {
    spyOn($scope.modalEditPev, 'show');
    $scope.editMarking(pev);
    expect($scope.modalEditPev.show).toHaveBeenCalled();
  });

  it('should call edit marking if it has a marking as parameter', function() {
    spyOn($scope.modalEditMarking, 'show');
    $scope.editMarking(incident);
    expect($scope.modalEditMarking.show).toHaveBeenCalled();
  });

  it('should evaluate pev with +1 like', function() {
    var evaluation = true;
    $rootScope.pevs = pevs;
    $scope.evaluate(pev, evaluation);
    var index = $rootScope.pevs.indexOf(pev);
    $httpBackend.expectPOST(URL + '/pevs/increment', $rootScope.pevs[index]).respond(201);
    $httpBackend.flush();
    expect($scope.buttonClicked).toEqual(false);
    expect($rootScope.pevs[index].likes).toEqual(1);
  });

  it('should evaluate pev with +1 dislike', function() {
    var evaluation = false;
    $rootScope.pevs = pevs;
    $scope.evaluate(pev, evaluation);
    var index = $rootScope.pevs.indexOf(pev);
    $httpBackend.expectPOST(URL + '/pevs/increment', $rootScope.pevs[index]).respond(201);
    $httpBackend.flush();
    expect($scope.buttonClicked).toEqual(false);
    expect($rootScope.pevs[index].dislikes).toEqual(1);
  });

});
