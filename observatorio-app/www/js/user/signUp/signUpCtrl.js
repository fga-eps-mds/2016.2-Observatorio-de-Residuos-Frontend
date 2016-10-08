angular.module('app.controllers')
/* Controller responsável por realizar o cadastro de usuários.
  registerEmail: Chamado pelo botão da signup.html, irá receber os dados do usuário e salva-los.
                 Usuário recebido aqui já deve ter sido validado pela view.
*/
.controller('signupCtrl', function ($scope, factoryRegister, currentUserService, $state) {
  /*Caso utilizem o botão de login social sem se cadastrar os dados do
    cadastro se preenchem sozinhos através da service de usuário atual.*/
  $scope.user = currentUserService.getUserData()
  $scope.registerEmail= function(user){
      console.log(user);
      factoryRegister.save(user, function(result){
        console.log(result);
        $scope.invalidEmail = false;
        $state.go("menu.home")
      }, function(error){
        $scope.invalidEmail = true;
      })
  }
})
