describe('passwordDirective', function(){
  var $compile;
  var $scope;
  var directiveElement;
  var $httpBackend;
  
  beforeEach(module('starter'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_){
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', /\.html$/).respond('');
    directiveElement = getCompiledElement();
  }));

  function getCompiledElement() {
    var element = angular.element('\
      <form name="signup">\
     <input id="password_field" type="password" name="password"\
      ng-model="password" placeholder="Senha" required />\
     \
     <br/>\
     \
     <input id="password_confirmation_field" ng-click="count = 0" ng-init="count = 0"\
      ng-keydown="count = count + 1" type="password"\
      name="password_confirmation" ng-model="password_confirmation"\
      placeholder="Confirmação da Senha" required=""\
      confirm-pwd="password" />\
      </form>');
    var compiledElement = $compile(element)($scope);
    $scope.$digest();
    return compiledElement;
  };


  it('form should be valid with matching password and password confirmation', function(){
    $scope.signup.password.$setViewValue('cacofonia');
    $scope.signup.password_confirmation.$setViewValue('cacofonia');
    $scope.$apply();
    expect($scope.signup.$valid).toBeTruthy();
  });

  it('form should be invalid with diverging password and password confirmation', function(){
    $scope.signup.password.$setViewValue('cacofonia');
    $scope.signup.password_confirmation.$setViewValue('cacofonia2');
    $scope.$apply();
    expect($scope.signup.$invalid).toBeTruthy();
  });
});