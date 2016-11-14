angular.module('app.controllers')
/* Controller responsável pelo login de usuário.
loginAttempt: Recebe o email e senha do formulário signin.html
              faz a tentativa de login através da factoryLogin.

registerSocial: Recebe a rede social desejada pelo parametro carregado no botão na signin.html.
                Recebendo o usuário, o envia para a service de login social.
*/

.controller('signinCtrl', function ($scope, $stateParams, $state, 
                                    socialLoginService, firebaseService, 
                                    currentUserService, factoryEmail, 
                                    factoryLogin, $ionicLoading, $timeout, 
                                    $ionicPopup) {
  $scope.loginAttempt = function(user){
      user.encripted_password = String(CryptoJS.SHA256(user.password)); //criptografia da senha
      console.log(user);
      factoryLogin.save(user, function(result){
        currentUserService.setUserData(result);
        //Variavel responsavel por exibir a mensagem de email inválido ou senha na tela;
        $state.go('tabs.home')
        $scope.loginError = false;
      }, function(error){
        if(error.status == 403) {
          $ionicPopup.alert({
            template: 'Esta conta está desativada.',
            title: 'Erro'
          });
        } else {
          //Caso receba Unauthorized do servidor, ativa o erro para ser exibido na view.
          console.log("ERRO!")
          $scope.loginError = true;
        } 
      })
    }

  $scope.registerSocial = function(socialNetwork){
          firebaseService.socialLogin(socialNetwork);
          $ionicLoading.show({
            template: 'Recebendo suas informações... <ion-spinner icon="android"></ion-spinner>'
          });
          //timeout para aguardar os dados serem recebidos antes de liberar a tela para o usuário.
          $timeout(function(){
            $ionicLoading.hide();
          },3000);
  }
})
