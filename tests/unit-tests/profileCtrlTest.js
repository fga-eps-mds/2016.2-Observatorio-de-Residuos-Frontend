describe('ProfileCtrl', function(){
  var $controller;
  var $scope = {};
  var currentUserService;
  beforeEach(module('starter'));
  beforeEach(inject(function(_$controller_, _currentUserService_){
      $controller = _$controller_;
      currentUserService = _currentUserService_;
  }))
  it('Sets up the user data on the scope using the currentUserService', function(){
    var userData = {first_name: "Pablo Diego", last_name: "Silva da Silva", gender: "male", email: "pablodiegoss@hotmail.com", nome_completo: "Pablo Diego Silva da Silva"};
    currentUserService.setUserData(userData);
    var controller = $controller('profileCtrl', {$scope:$scope, currentUserService: currentUserService});

    expect($scope.user).toEqual(userData);
  });
});
