angular.module('app.controllers')

.controller('profileCtrl', function(currentUserService, $scope, $http, URL, $ionicPopup){
  $scope.user = currentUserService.getUserData();

  $http.get(URL + '/profiles/' + $scope.user.perfil.toLowerCase())
  .success(function(profile) {
    $scope.profile = profile;
    document.getElementById('profile-description').innerHTML = profile.descricao_perfil;
  })
  .error(function(error) {
    $ionicPopup.alert({template: 'Falha ao obter descrição do perfil'});
  })
});

