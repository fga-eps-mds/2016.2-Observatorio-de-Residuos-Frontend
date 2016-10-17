describe('SocialServices', function(){
  var serviceGoogle;
  var serviceFacebook;
  var userExtractorService;
  var $state;

  beforeEach(module('starter'));

  beforeEach(inject(function(_googleExtractor_,_facebookExtractor_, _userDataExtractorService_){
    serviceGoogle = _googleExtractor_;
    serviceFacebook = _facebookExtractor_;
    userExtractorService = _userDataExtractorService_;
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
    
    it('calls facebookExtractor with button facebook string parameter', function(){
        var authDataFacebook = {facebook:{email:'amoedo@gmail.com', cachedUserProfile:{first_name:"Amoedo",last_name:'Mito',gender:'male'}}};
        spyOn(serviceFacebook, 'extract');
        userExtractorService.extract(authDataFacebook,'facebook');
        expect(serviceFacebook.extract).toHaveBeenCalledWith(authDataFacebook);
    });

    it('calls googleExtractor with button facebook string parameter', function(){
        var authDataGoogle = {google:{email:'amoedo@gmail.com', cachedUserProfile:{given_name:"Amoedo",family_name:'Mito',gender:'male'}}};
        spyOn(serviceGoogle,'extract');
        userExtractorService.extract(authDataGoogle,'google');
        expect(serviceGoogle.extract).toHaveBeenCalledWith(authDataGoogle);
    });
  });
});
