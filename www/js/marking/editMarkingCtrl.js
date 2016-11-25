angular.module("app.controllers")

.controller("editMarkingCtrl", function($scope, $rootScope, $http, URL, $state/*, $ionicModal*/, currentMarkingService, factoryEditMarking, $ionicLoading){
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
    console.log("Error");
  })

 //Function that send changes to backend
 $scope.confirmEditMarking = function(marking, modalEditMarking) {
  marking.photo_link = $scope.imgURI;
  factoryEditMarking.save(marking, function(result) {
   modalEditMarking.hide();
  }, function(error) {
   console.log(error);
  })
 };

 $scope.updatephoto = function () {
  $scope.marking.photo_link = $scope.imgURI;
 };

})
