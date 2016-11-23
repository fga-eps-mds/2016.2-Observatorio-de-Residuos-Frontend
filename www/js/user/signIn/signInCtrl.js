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
                                    $ionicPopup, $http, URL) {

  $scope.secret = {};
  $scope.loginAttempt = function(user){
      user.encripted_password = String(CryptoJS.SHA256($scope.secret.password)); //criptografia da senha
      factoryLogin.save(user, function(result){
        $ionicLoading.show({
          template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
        });
        $http.get(URL + "/user/" + result.id_usuario + "/markings")
        .success(function(seenMarkings) {
          $http.get(URL + "/user/" + result.id_usuario + "/pevs")
          .success(function(seenPevs) {
            $ionicLoading.hide();
            currentUserService.setUserData(result);
            currentUserService.setUserMarking(seenMarkings);
            currentUserService.setUserPevs(seenPevs);
            $state.go('tabs.home')
            $scope.loginError = false;
          })
          .error(function(error) {
            $ionicLoading.hide();
            console.log(error);
          });
        })
        .error(function(error) {
          console.log(error);
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
            template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
          });
          //timeout para aguardar os dados serem recebidos antes de liberar a tela para o usuário.
          $timeout(function(){
            $ionicLoading.hide();
          },3000);
  }
})
