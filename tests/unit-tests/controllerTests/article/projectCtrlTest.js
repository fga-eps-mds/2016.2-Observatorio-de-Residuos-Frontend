describe('projectCtrl', function() {
  var $controller;
  var $scope;
  var $rootScope;
  var $state;
  var $httpBackend;
  var projectService;
  var URL;

  beforeEach(module('starter'));

  beforeEach(inject(function(_$controller_, _$rootScope_, _$httpBackend_, 
    _$injector_, _projectService_, _$state_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    projectService = _projectService_;
    $httpBackend = _$httpBackend_;
    $state = _$state_;
    $httpBackend.when('GET', /\.html$/).respond('');
    URL = _$injector_.get('URL');
  }));

  beforeEach(function() {
    var controller = $controller('projectsCtrl', {$scope: $scope});
  });

  var projects = [
  {
    "id_contribuicao":1,
    "id_tipo_contribuicao":1,
    "titulo_contribuicao":"BioGama na Unb",
    "resumo_contribuicao":"Reciclagem de óleo para evitar poluição"
  }]
  var project = projects[0];

  it('should get all projects and store then in scope after successfull\
   connection', function() {
    $rootScope.projects = [];
    $httpBackend.expectGET(URL + '/projects').respond(200, projects);
    $httpBackend.flush();
    expect($rootScope.projects).toEqual(projects);
  });

  it('should do nothing on failed connection', function() {
    $rootScope.projects = [];
    $httpBackend.expectGET(URL + '/projects').respond(400);
    $httpBackend.flush();
    expect($rootScope.projects).toEqual([]);
  });

  it("should set a project and go to it's details page when opening\
   a project", function() {
    spyOn(projectService, 'setProject');
    spyOn($state, 'go');
    $scope.openProject(project);
    expect(projectService.setProject).toHaveBeenCalledWith(project);
    expect($state.go).toHaveBeenCalledWith('tabs.to-contribuindo.detailProject');
  })
});


