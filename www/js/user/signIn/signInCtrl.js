angular.module('app.controllers')
    /* Controller responsable for user login
loginAttempt: Receive email and password form signin.html.
              Try to make login through factoryLogin.

registerSocial: Receive social media desired by the parameter on button at signin.html.
                Receiving user sends to service of social login.
*/

.controller('signinCtrl', function ($scope, $stateParams, $state, 
                                    socialLoginService, firebaseService, 
                                    currentUserService, factoryEmail, 
                                    factoryLogin, $ionicLoading, $timeout, 
                                    $ionicPopup, $http) {

  $scope.secret = {};
  $scope.loginAttempt = function(user){
      user.encripted_password = String(CryptoJS.SHA256($scope.secret.password)); //criptografia da senha
      factoryLogin.save(user, function(result){
        $http.get("http://localhost:3000/user/" + result.id_usuario + "/markings")
        .success(function(seenMarkings){
          currentUserService.setUserData(result);
          currentUserService.setUserMarking(seenMarkings);
          console.log(currentUserService.getUserMarking());
          // Variavel responsavel por exibir a mensagem de email inválido ou senha na tela;
          $state.go('tabs.home')
          $scope.loginError = false;
        });

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
