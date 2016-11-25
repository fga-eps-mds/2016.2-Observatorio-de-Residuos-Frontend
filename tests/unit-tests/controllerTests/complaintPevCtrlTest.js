describe('complaintPevCtrlTest', function(){
  var $scope;
  var $httpBackend;
  var $state;
  var currentPEVservice;
  var currentUserService;
  var factoryComplaintPEV;
  var $ionicPopup;
  var $controller;
  var URL;
  beforeEach(module('starter'));
  beforeEach(inject(function(_$httpBackend_,_$injector_,_$rootScope_, _currentPEVservice_, _currentUserService_,_$ionicPopup_, _$state_,_factoryComplaintPEV_, _$controller_){
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    $state = _$state_;
    $ionicPopup = _$ionicPopup_;
    $controller = _$controller_
    currentUserService = _currentUserService_;
    currentPEVservice = _currentPEVservice_;
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', /\.html$/).respond('');
    URL = _$injector_.get('URL');
  }))
  it('should send a complaint about a marking to the database', function(){
    var complaint = {};
    currentUserService.setUserData({email:'AmoedoMito@gmail.com'});
    currentPEVservice.setPEV({id_pev:15});
    var complaintMarkingCtrl = $controller('complaintPevCtrl', {$scope:$scope, $ionicPopup:$ionicPopup});
    spyOn($state,'go');
    spyOn($ionicPopup, 'confirm').and.callFake(function(){
      return{
        then: function(res){
          return res({});
        }
      }
    });
    $httpBackend.expectPOST(URL+"/pev_complaints/create", complaint).respond(200);
    $scope.confirmComplaint(complaint);
    $httpBackend.flush();
    expect($state.go).toHaveBeenCalledWith('tabs.map');
  });
  it('should not send a complaint if conection got an error', function(){
    var complaint = {};
    currentUserService.setUserData({email:'AmoedoMito@gmail.com'});
    currentPEVservice.setPEV({id_incidente:15});
    var complaintMarkingCtrl = $controller('complaintPevCtrl', {$scope:$scope, $ionicPopup:$ionicPopup});
    spyOn($state,'go');
    spyOn($ionicPopup, 'confirm').and.callFake(function(){
      return{
        then: function(res){
          return res({});
        }
      }
    });
    $httpBackend.expectPOST(URL+"/pev_complaints/create", complaint).respond(400);
    $scope.confirmComplaint(complaint);
    $httpBackend.flush();
    expect($state.go).not.toHaveBeenCalled();
  });
  it('should not send anything if user cancel the action', function(){
    var complaint = {};
    currentUserService.setUserData({email:'AmoedoMito@gmail.com'});
    currentPEVservice.setPEV({id_incidente:15});
    var complaintMarkingCtrl = $controller('complaintPevCtrl', {$scope:$scope, $ionicPopup:$ionicPopup});
    spyOn($state,'go');
    spyOn($ionicPopup, 'confirm').and.callFake(function(){
      return{
        then: function(res){
          return res(null);
        }
      }
    });
    $scope.confirmComplaint(complaint);
    expect($state.go).not.toHaveBeenCalled();
  });
});
