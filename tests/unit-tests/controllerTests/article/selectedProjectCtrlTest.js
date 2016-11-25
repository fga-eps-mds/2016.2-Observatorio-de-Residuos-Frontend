describe('selectedProjectCtrl', function() {
  var $controller;
  var $scope;
  var $rootScope;
  var projectService;

  beforeEach(module('starter'));

  beforeEach(inject(function(_$controller_, _$rootScope_, _projectService_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    projectService = _projectService_;
  }));

  var project = {
    "id_contribuicao":1,
    "id_tipo_contribuicao":1,
    "titulo_contribuicao":"BioGama na Unb",
    "resumo_contribuicao":"Reciclagem de óleo para evitar poluição"
  }
  beforeEach(function() {
    projectService.setProject(project);
    spyOn(projectService, 'getProject').and.callThrough();
    var controller = $controller('selectedProjectCtrl', {$scope: $scope});
  });

  it('should store a project from service to scope', function() {
    expect(projectService.getProject).toHaveBeenCalled();
    expect($scope.selected_project).toEqual(project)
  });

});