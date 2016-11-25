angular.module('app.controllers')

.controller("newPevCtrl", function($ionicHistory, NgMap, $state, $scope, $rootScope, currentUserService, factoryPEV, $ionicPopup, URL) {
 var options = {
  enableHighAccuracy: true
 };
 if (angular.isUndefined($rootScope.pevs)) {
  $rootScope.pevs = [];
 }

 //Function that create scope variable and register new PEV
 $scope.createPEV = function(pev) {
  NgMap.getGeoLocation().then(function(map) {
   pev.latitude = map.lat();
   pev.longitude = map.lng();
   pev.author_email = currentUserService.getUserData().email;
   pev.total_confirmacoes_funcionando = 0;
   pev.total_confirmacoes_fechou = 0;
   pev.photo_link = $scope.imgURI;
   factoryPEV.save(pev, function(result) {
    result.author_email = pev.author_email;
    result.author_name = pev.author_name;
    $rootScope.pevs.push(result);
    var alertPopup = $ionicPopup.alert({
     title: 'PEV cadastrada com sucesso',
     template: 'Obrigado por contribuir!'
    });
    $scope.pev = {}
    $ionicHistory.nextViewOptions({
     disableBack: true
    });
    $state.go('tabs.map')
     /* This state must be reset and the back button too */
   }, function(error) {
    var alertPopup = $ionicPopup.alert({
     title: 'Informações insuficientes',
     template: 'Preencha as informações corretamente!'
    })
   });
  }, function(error) {
   alert('Unable to get location: ' + error.message);
  }, options);
 }

 $scope.updatephoto = function () {
  $scope.pev.photo_link = $scope.imgURI;
 };
})