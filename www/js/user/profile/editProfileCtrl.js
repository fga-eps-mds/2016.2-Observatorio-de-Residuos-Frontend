angular.module('app.controllers')

.controller('editProfileCtrl', function($scope, $http, URL, $rootScope, 
                                        currentUserService, factoryProfile, 
                                        $state, $ionicPopup, $timeout,
                                        factoryDeactivation, $ionicLoading) {
  
  $rootScope.profiles = [];

  $ionicLoading.show({
    template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
  });

  $http.get(URL + '/profiles')
  .success(function(content){
    $ionicLoading.hide();
    angular.forEach(content, function(value, key) {
      $rootScope.profiles.push(value);
    })
  })
  .error(function(error){
    $ionicPopup.alert({
      template: 'Não foi possível acessar o perfil, tente novamente.',
      title: 'Erro'
    });
    $ionicLoading.hide();
  })

  $scope.user = currentUserService.getUserData();

  $scope.editUser = function(user) {
    $ionicLoading.show({
        template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
    });

    user.photo_link = $scope.imgURI;
    
    factoryProfile.save(user, function (result) {
      currentUserService.setUserData(result);
      $ionicLoading.hide();
      $state.go('tabs.profile');
    }, function (error) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          template: 'Não foi possível editar seu Perfil, tente novamente.',
          title: 'Erro'
        });
    })
  };

  $scope.deactivateAccount = function(user) {
    $scope.data = {};
    $ionicPopup.show({
      template: '<p>Esta é uma ação permanente, e não pode ser\
      desfeita. Para continuar, digite sua senha abaixo. Você tem certeza\
      de que deseja desativar sua conta?<p>\
      <input type="password" ng-model="data.password">',
      title: 'Atenção',
      scope: $scope,
      buttons: [
        {text: 'Cancelar'},
        {text: 'Desativar',
         onTap: $scope.validateDeactivation = function() {
            
            var password = $scope.data.password;
            var encryptedPassword = String(CryptoJS.SHA256(password));
            var id = $scope.user.id_usuario;
            
            factoryDeactivation.save({id: id, password: encryptedPassword}, function(result){
              $ionicLoading.show({
                template: 'Conta desativada com sucesso. Por favor, aguarde...'
              });
              $timeout(function(){
                $ionicLoading.hide();
                currentUserService.setUserData(null);
                $state.go('signin');
              }, 3000);
            }, function(error){
                $ionicLoading.hide();
                var template;
                if(error.status == 401) {
                  template = 'Senha incorreta.'
                } else {
                  template = 'Código do erro: ' + error.status + '.';
                }
                $ionicPopup.alert({
                    title: 'Erro',
                    template: template
                });
            });

          }
        }
      ],
    });
  };

  $scope.updatephoto = function () {
    $scope.user.photo_link = $scope.imgURI;
  };

});
