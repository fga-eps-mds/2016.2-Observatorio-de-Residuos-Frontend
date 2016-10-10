describe('SocialServices', function(){
  var serviceGoogle
  var serviceFacebook
  var userExtractorService
  var $state
  beforeEach(module('starter'))
  beforeEach(inject(function(_googleExtractor_,_facebookExtractor_, _userDataExtractorService_){
    serviceGoogle = _googleExtractor_
    serviceFacebook = _facebookExtractor_
    userExtractorService = _userDataExtractorService_
    })
  )
  describe('googleExtractor', function(){
    var authData = {google:{email:'amoedo@gmail.com', cachedUserProfile:{given_name:"Amoedo",family_name:'Mito',gender:'male'}}}
    it('extracts google information from authData object', function(){
      var userData = serviceGoogle.extract(authData)
      expect(userData.first_name).toBeDefined()
      expect(userData.last_name).toBeDefined()
      expect(userData.gender).toBeDefined()
      expect(userData.email).toBeDefined()
    })
  })

  describe('facebookExtractor', function(){
    var authData = {facebook:{email:'amoedo@gmail.com', cachedUserProfile:{first_name:"Amoedo",last_name:'Mito',gender:'male'}}}
    it('extracts facebook information from authData object', function(){
      var userData = serviceFacebook.extract(authData)
      expect(userData.first_name).toBeDefined()
      expect(userData.last_name).toBeDefined()
      expect(userData.gender).toBeDefined()
      expect(userData.email).toBeDefined()
    })
  })

  describe('userDataExtractorService', function(){
    var authDataFacebook = {facebook:{email:'amoedo@gmail.com', cachedUserProfile:{first_name:"Amoedo",last_name:'Mito',gender:'male'}}}
    var authDataGoogle = {google:{email:'amoedo@gmail.com', cachedUserProfile:{given_name:"Amoedo",family_name:'Mito',gender:'male'}}}
    it('calls facebookExtractor with button facebook string parameter', function(){
        spyOn(serviceFacebook, 'extract')
        userExtractorService.extract(authDataFacebook,'facebook')
        expect(serviceFacebook.extract).toHaveBeenCalledWith(authDataFacebook)
    })

    it('calls googleExtractor with button facebook string parameter', function(){
        spyOn(serviceGoogle,'extract')
        userExtractorService.extract(authDataGoogle,'google')
        expect(serviceGoogle.extract).toHaveBeenCalledWith(authDataGoogle)
    })
  })
})
