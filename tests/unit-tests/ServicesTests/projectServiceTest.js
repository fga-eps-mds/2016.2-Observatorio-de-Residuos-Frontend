describe('projectService', function() {
  var projectService;

  beforeEach(module('starter'));

  beforeEach(inject(function(_projectService_){
    projectService = _projectService_;
  }));

  it('should get and set a user data', function() {
    var project = "";
    projectService.setProject("Projetinho do Amoêdo Mitoso");
    project = projectService.getProject();
    expect(project).toBe("Projetinho do Amoêdo Mitoso");
  });

});
