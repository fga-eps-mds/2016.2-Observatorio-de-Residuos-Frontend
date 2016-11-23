describe('SocialServices', function(){
  var serviceGoogle;
  var serviceFacebook;
  var userExtractorService;
  var $state;
  var $httpBackend;
  var URL;
  beforeEach(module('starter'));

  beforeEach(inject(function($injector, _googleExtractor_,_facebookExtractor_, 
    _userDataExtractorService_, _$httpBackend_, 
    _factoryEmail_, _$state_ ,_currentUserService_, 
    _socialLoginService_){
    
    serviceGoogle = _googleExtractor_;
    serviceFacebook = _facebookExtractor_;
    factoryEmail = _factoryEmail_; 
    $state = _$state_;
    currentUserService = _currentUserService_;
    userExtractorService = _userDataExtractorService_;
    $httpBackend = _$httpBackend_;
    socialLoginService = _socialLoginService_;
    URL = $injector.get('URL');
    $httpBackend.when('GET', /\.html$/).respond('');
  }));

  describe('socialLoginService', function(){
    var paramUserData = {email:'amoedo@gmail.com', first_name:"Amoedo",last_name:'Mito',gender:'male'}

    it('when existing user loggin, redirects to home page', function(){
      spyOn($state, 'go');
      spyOn(currentUserService, 'setUserData');
      spyOn(currentUserService, 'setUserMarking');
      spyOn(currentUserService, 'setUserPevs');
      var result = {id_usuario: 1, usuario: "amoedo@gmail.com", nome_completo: "Lucas Amoêdo"}; 
      $httpBackend.expectPOST(URL+"/users/verify_email", {"email": paramUserData.email}).respond(200, result);
      $httpBackend.expectGET(URL + "/user/" + result.id_usuario + "/markings").respond(200);
      $httpBackend.expectGET(URL + "/user/" + result.id_usuario + "/pevs").respond(200);
      socialLoginService.login(paramUserData);
      $httpBackend.flush();
      expect(currentUserService.setUserData).toHaveBeenCalled();
      expect(currentUserService.setUserMarking).toHaveBeenCalled();
      expect(currentUserService.setUserPevs).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalledWith('tabs.home');
    });

    it('verifica email e usuario não existe', function(){
      var result = {newUser: true}; 
      $httpBackend.expectPOST(URL+"/users/verify_email", {"email": paramUserData.email}).respond(200, result);
      socialLoginService.login(paramUserData);
      $httpBackend.flush();
      expect(currentUserService.getUserData().id_usuario).toBe(result.id_usuario);
    });

    it('não verifica email', function(){
      $httpBackend.expectPOST(URL+"/users/verify_email", {"email": paramUserData.email}).respond(400);
      socialLoginService.login(paramUserData);
      $httpBackend.flush();
      expect(currentUserService.getUserData()).not.toBe(paramUserData);
    });
  });
  
  describe('Extractors', function() {
    var userData;

    afterEach(function() {
      expect(userData.first_name).toBe('Amoedo');
      expect(userData.last_name).toBe('Mito');
      expect(userData.gender).toBe('male');
      expect(userData.email).toBe('amoedo@gmail.com');
    });

    describe('googleExtractor', function(){
      var paramUserData = {email:'amoedo@gmail.com', given_name:"Amoedo",family_name:'Mito',gender:'male'}
      it('extracts google information from userData object', function(){
        userData = serviceGoogle.extract(paramUserData);
      });
    });

    describe('facebookExtractor', function(){
      var paramUserData = {email:'amoedo@gmail.com', first_name:"Amoedo",last_name:'Mito',gender:'male'}
      it('extracts facebook information from userData object', function(){
        userData = serviceFacebook.extract(paramUserData);
      });
    });

  });

  describe('userDataExtractorService', function(){
    var result = {credential:{accessToken:'123123123'}}
    it('calls facebookExtractor with button facebook string parameter', function(){
      var fields = 'first_name, last_name, gender, email';
      var userData = {email:'amoedo@gmail.com', first_name:"Amoedo", last_name:'Mito',gender:'male'};
      $httpBackend.expectGET('https://graph.facebook.com/me?fields=' + fields + '&access_token=' + result.credential.accessToken).respond(201, userData);
      spyOn(serviceFacebook, 'extract');
      userExtractorService.extract(result,'facebook');

      $httpBackend.flush();
      expect(serviceFacebook.extract).toHaveBeenCalledWith(userData);
    });

    it('calls googleExtractor with button facebook string parameter', function(){
      var fields = 'first_name, last_name, gender, email';
      var userData = {email:'amoedo@gmail.com', given_name:"Amoedo",family_name:'Mito',gender:'male'};
      $httpBackend.expectGET("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+result.credential.accessToken).respond(201,userData);

      spyOn(serviceGoogle,'extract');
      userExtractorService.extract(result,'google');
      $httpBackend.flush();
      expect(serviceGoogle.extract).toHaveBeenCalledWith(userData);
    });
  });
});
