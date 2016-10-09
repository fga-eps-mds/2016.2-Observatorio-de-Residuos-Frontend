describe('signinCtrl',function(){
    var $controller
    var $httpBackEnd
    var $state
    beforeEach(module('starter'))
    beforeEach(inject(function(_$controller_, _$httpBackend_, _$state_){
      $controller = _$controller_
      $httpBackEnd = _$httpBackend_
      $httpBackEnd.when('GET', /\.html$/).respond('');
      $state = _$state_
              })
    )
    describe('loginAttempt',function(){
      var $scope = {}
      var URL = "http://localhost:3000/sessions/login"
      var user = {name:'Amoedo', email:'amoedo@gmail.com'}

        beforeEach(function(){
          var controller = $controller('signinCtrl', {$scope: $scope})
          spyOn($state, 'go')
        })

        it('login a valid user succesfully', function(){
          $httpBackEnd.expectPOST(URL,user).respond(201)
          $scope.loginAttempt(user)
          $httpBackEnd.flush()
          expect($state.go).toHaveBeenCalledWith("menu.home")
          expect($scope.loginError).toBeFalsy()
        })

        it('does not login an invalid user', function(){
            $httpBackEnd.expectPOST(URL,user).respond(401)
            $scope.loginAttempt(user)
            $httpBackEnd.flush()
            expect($state.go).not.toHaveBeenCalled()
            expect($scope.loginError).toBeTruthy()
        })
    })
})
