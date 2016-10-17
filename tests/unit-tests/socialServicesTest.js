describe('SocialServices', function(){
  var serviceGoogle;
  var serviceFacebook;
  var userExtractorService;
  var $state;
  var $httpBackend;
  beforeEach(module('starter'));

  beforeEach(inject(function(_googleExtractor_,_facebookExtractor_, _userDataExtractorService_, _$httpBackend_){
    serviceGoogle = _googleExtractor_;
    serviceFacebook = _facebookExtractor_;
    userExtractorService = _userDataExtractorService_;
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', /\.html$/).respond('');
    }));

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
