angular.module('starter')
//Services responsáveis por realizar o login e cadastro com redes sociais.


/* googleExtractor
     extract: Extrai os dados recebidos da authData no formato google. */
.service('googleExtractor', function(){
var userData = {};
var extract = function(paramUserData){
  userData.first_name = paramUserData.given_name;
  userData.last_name  = paramUserData.family_name;
  userData.gender = paramUserData.gender;
  userData.email = paramUserData.email;
  userData.profile_type = paramUserData.profile_type;
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

.service('firebaseService', function(userDataExtractorService, socialLoginService){
  var userData = {};
  var socialLogin = function(socialNetwork){
    var provider = (socialNetwork == 'google')?new firebase.auth.GoogleAuthProvider():new firebase.auth.FacebookAuthProvider();
    if(socialNetwork=="facebook"){
      provider.addScope('public_profile');
    }
    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log(result.user.email);
        userData = result.user;
        socialLoginService.login(result.user);
    }).catch(function(error) {
        console.log(error.code);
        console.log(errorMessage = error.message);
        console.log(email = error.email);
        console.log(error.credential);
    });
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
        $state.go('menu.home')
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
