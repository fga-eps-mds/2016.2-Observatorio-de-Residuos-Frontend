angular.module('app.controllers')
/* Controller responsável por realizar o cadastro de usuários.
  registerEmail: Chamado pelo botão da signup.html, irá receber os dados do usuário e salva-los.
                 Usuário recebido aqui já deve ter sido validado pela view.
*/
.controller('signupCtrl', function ($scope, $http, URL, factoryRegister, currentUserService, $state, $ionicPopup) {

  /*Caso utilizem o botão de login social sem se cadastrar os dados do
    cadastro se preenchem sozinhos através da service de usuário atual.*/
  $scope.profiles = [];

  $http.get(URL + '/profiles')
  .success(function(content){
    angular.forEach(content, function(value, key) {
      $scope.profiles.push(value);
    })
  })
  .error(function(error){
    console.log("Error");
  })


  $scope.user = currentUserService.getUserData();
  console.log($scope.user);
  $scope.registerEmail= function(user){
      user.password_digest = String(CryptoJS.SHA256(user.password));//criptografia
      console.log(user);
      factoryRegister.save(user, function(result){
        console.log(result);
        $scope.invalidEmail = false;
            var alertPopup = $ionicPopup.alert({
              title: 'Bem-vindo ao Observatório de Resíduos',
              //subTitle: '',
              template: 'O Observatório de Resíduos é um aplicativo que permite que você compartilhe incidentes, locais para depositar seus resíduos e ainda permite que você encontre ou divulgue seu projeto social! Sinta-se em casa!'
            });
        $state.go('tabs.home')
      }, function(error){
        $scope.invalidEmail = true;
      })
  }
})
