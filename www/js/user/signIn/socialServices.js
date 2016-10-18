angular.module('starter')
//Services responsáveis por realizar o login e cadastro com redes sociais.


/* googleExtractor
     extract: Extrai os dados recebidos da authData no formato google. */
.service('googleExtractor', function(){
var userData = {};
var extract = function(authData){
  userData.first_name = authData.google.cachedUserProfile.given_name;
  userData.last_name  = authData.google.cachedUserProfile.family_name;
  userData.gender = authData.google.cachedUserProfile.gender;
  userData.email = authData.google.email;
  return userData;
}
  return{
    extract: extract
  }
})

/* facebookExtractor
    extract: Extrai os dados recebidos da authData no formato facebook. */
.service('facebookExtractor', function(){
var userData = {};
var extract = function(authData){
  userData.first_name = authData.facebook.cachedUserProfile.first_name;
  userData.last_name = authData.facebook.cachedUserProfile.last_name;
  userData.gender = authData.facebook.cachedUserProfile.gender;
  userData.email = authData.facebook.email;
  return userData;
}
  return{
    extract: extract
  }
})

/* userDataExtractorService
      extract: responsável por decidir qual a rede social utilizada
               e chamar as devidas services extratoras.  */
.service('userDataExtractorService',function(facebookExtractor, googleExtractor){
  var extract = function(authData, paramSocialNetwork){
    authData.profile_type = "cidadao";
    if(paramSocialNetwork == 'facebook'){
      return facebookExtractor.extract(authData);
    }else{
      return googleExtractor.extract(authData);
    }
  }
  return {
    extract: extract
  }
})

/* firebaseService
      Responsável por instanciar o objeto do firebase para receber os dados do usuário.

      socialLogin: Recebe a string de qual rede social desejada e realiza a autenticação.
                  em caso de sucesso chama a service para extração dos dados e salva o usuário.
                  em caso de erro salva um usuário nulo.

      getData: Método para acessar as informações salvas do usuário
              após o carregamento de todas elas no metodo login.  */

.service('firebaseService', function(userDataExtractorService, $q){
  var ref = new Firebase("dojogrupo04.firebaseio.com");
  var userData;
  var socialLogin = function(socialNetwork){
    var deferred = $q.defer();
    ref.authWithOAuthPopup(socialNetwork, function(error, authData){
      if(error){
        console.log("Failed ", error)
        userData = null;
        deferred.resolve(userData);
      }
      else{
        userData =  userDataExtractorService.extract(authData, socialNetwork);
        deferred.resolve(userData);
      }
    },{
      scope: "email"
    })
    return deferred.promise;
  }
  var getData = function(){
    return userData
  }
    return{
      getData: getData,
      socialLogin: socialLogin
    }
})

/* socialLoginService
    login: Responsável por validar os dados recebidos pelo firebase
           e decidir qual o state este usuário deve ser enviado */
.service('socialLoginService', function(factoryEmail, $state ,currentUserService){
  var login = function(user){
    factoryEmail.save({"email": user.email}, function(result) {
      currentUserService.setUserData(user)
      if(result.userExist){
        $state.go('tabs.map')
      }else{
        $state.go('signup')
      }
    }, function(error){
      console.log(error)
    })
  }
  return{
    login : login
  }
})
