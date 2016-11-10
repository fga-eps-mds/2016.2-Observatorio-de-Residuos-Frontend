describe('EditProfileCtrl', function(){
  var $controller;
  var $scope = {};
  var currentUserService;
  var $httpBackend;
  var URL;
  var factoryProfile;
  beforeEach(module('starter'));
  beforeEach(inject(function(_$controller_, _currentUserService_, _$httpBackend_, $injector, _factoryProfile_){
      $controller = _$controller_;
      currentUserService = _currentUserService_;
      URL = $injector.get('URL');
      $httpBackend = _$httpBackend_;
      $httpBackend.when('GET', /\.html$/).respond('');
      factoryProfile = _factoryProfile_;
  }));
  it('Gets the user data from currentUserService and update it with the new user data from view', function(){
    var userData = {first_name: "Pablo Diego", last_name: "Silva da Silva", gender: "male", email: "pablodiegoss@hotmail.com", nome_completo: "Pablo Diego Silva da Silva"};
    var newUserData = {first_name: "Teste Ok", last_name: "Somos bons em JS", gender: "male", email: "amoedoMito@hotmail.com", nome_completo: "Lucas 'Mito' Amoedo"};
    currentUserService.setUserData(userData);
    var controller = $controller('editProfileCtrl', {$scope:$scope, currentUserService: currentUserService});
    expect($scope.user).toEqual(userData);

    $httpBackend.expectPOST(URL+'/users/edit',newUserData).respond(200);
    $scope.editUser(newUserData)
    $httpBackend.flush();

    //var userServiceData = currentUserService.getData();
    //expect(userServiceData).toEqual(newUserData);
  });
});
