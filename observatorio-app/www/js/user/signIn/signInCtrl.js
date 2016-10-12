angular.module('app.controllers')
/* Controller responsável pelo login de usuário.
loginAttempt: Recebe o email e senha do formulário signin.html
              faz a tentativa de login através da factoryLogin.

registerSocial: Recebe a rede social desejada pelo parametro carregado no botão na signin.html.
                Recebendo o usuário, o envia para a service de login social.
*/

.controller('signinCtrl', function ($scope, $stateParams, $state, socialLoginService, firebaseService, currentUserService, factoryEmail, factoryLogin, $ionicLoading, $timeout) {
  $scope.loginAttempt = function(user){
      user.password = String(CryptoJS.SHA256(user.password)); //criptografia da senha
      console.log(user);
      factoryLogin.save(user, function(result){
        //Variavel responsavel por exibir a mensagem de email inválido ou senha na tela;
        $state.go("menu.home")
        $scope.loginError = false;
      }, function(error){
        //Caso receba Unauthorized do servidor, ativa o erro para ser exibido na view.
        console.log("ERRO!")
        $scope.loginError = true;
      })
    }

  $scope.registerSocial = function(socialNetwork){
      var login = firebaseService.socialLogin(socialNetwork);
      //login chama a execução do firebase e aguarda os dados do usuário para executar o login.
      login.then(function() {
        //Quando os dados já estiverem disponiveis, scopeUser recebe o usuario e o enviamos para a service de login.
        $scope.user = firebaseService.getData();
        if($scope.user != null){
          socialLoginService.login($scope.user);
        }
      });
      $ionicLoading.show({
      template: 'Recebendo suas informações... <ion-spinner icon="android"></ion-spinner>'
      });
      //timeout para aguardar os dados serem recebidos antes de liberar a tela para o usuário.
      $timeout(function(){
        $ionicLoading.hide();
      },3000);
  }
})
