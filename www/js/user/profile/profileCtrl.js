angular.module('app.controllers')

.controller('profileCtrl', function(currentUserService, $scope, $http, URL, $ionicPopup){
  $scope.user = currentUserService.getUserData();

  $scope.$on('$ionicView.enter', function() {

    $http.get(URL + '/profiles/' + $scope.user.id_perfil)
    .success(function(profile) {
      $scope.profile = profile;
      document.getElementById('profile-description').innerHTML = profile.descricao_perfil;
    })
    .error(function(error) {
      $ionicPopup.alert({template: 'Falha ao obter descrição do perfil'});
    })
  });
  
});

