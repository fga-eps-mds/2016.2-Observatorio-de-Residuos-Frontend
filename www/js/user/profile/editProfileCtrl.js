angular.module('app.controllers')

.controller('editProfileCtrl', function($scope, $http, URL, $rootScope, 
                                        currentUserService, factoryProfile, 
                                        $state, $ionicPopup, 
                                        factoryDeactivation) {
  
  $rootScope.profiles = [];

  $http.get(URL + '/profiles')
  .success(function(content){
    angular.forEach(content, function(value, key) {
      $rootScope.profiles.push(value);
    })
  })
  .error(function(error){
    console.log("Error");
  })

  $scope.user = currentUserService.getUserData();

  $scope.editUser = function(user) {
    factoryProfile.save(user, function (result) {
      currentUserService.setUserData(user);
      $state.go('tabs.profile');
    }, function (error) {
      console.log(error);
    })
  };

  $scope.deactivateAccount = function(user) {
    $scope.data = {};
    $ionicPopup.show({
      template: '<p>Atenção: esta é uma ação permanente, e não pode ser\
      desfeita. Para continuar, digite sua senha abaixo. Você tem certeza\
      de que deseja desativar sua conta?<p>\
      <input type="password" ng-model="data.password">',
      title: 'Atenção',
      scope: $scope,
      buttons: [
        {text: 'Cancelar'},
        {text: 'Deletar',
         onTap: function() {
            var password = $scope.data.password;
            var encryptedPassword = String(CryptoJS.SHA256(password));
            var id = $scope.user.id_usuario;
            factoryDeactivation.save({id: id, password: encryptedPassword}, function(result){
              console.log('ihul');
            }, function(error){
              console.log(error);
            });
          }
        }
      ],
    });
  };

});
