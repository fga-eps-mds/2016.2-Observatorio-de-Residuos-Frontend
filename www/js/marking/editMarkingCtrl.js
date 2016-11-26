angular.module("app.controllers")

.controller("editMarkingCtrl", function($scope, $rootScope, $http, URL, $state/*, $ionicModal*/, currentMarkingService, factoryEditMarking, $ionicLoading, $ionicPopup){
  //Function that update scope variables

  $rootScope.marking_types = [];
  $ionicLoading.show({
    template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
  });
  $http.get(URL + '/marking_types')
  .success(function(content){
    $ionicLoading.hide();
    angular.forEach(content, function(value, key) {
      $rootScope.marking_types.push(value);
    })
  })
  .error(function(error){
    $ionicLoading.hide();
      $ionicPopup.alert({
        template: 'Não foi possível acessar o Incidente, tente novamente.',
        title: 'Erro'
      });
    console.log("Error");
  })

  //Function that send changes to backend
  $scope.confirmEditMarking = function(marking, modalEditMarking){
    factoryEditMarking.save(marking, function(result) {
      modalEditMarking.hide();
    }, function(error){
      $ionicLoading.hide();
      $ionicPopup.alert({
        template: 'Não foi possível editar o Incidente, tente novamente.',
        title: 'Erro'
      });
      console.log(error);
    })
  };

})
