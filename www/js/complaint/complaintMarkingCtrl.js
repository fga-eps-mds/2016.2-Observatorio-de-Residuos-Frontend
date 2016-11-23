angular.module('starter')

//Controller to make a complaint about Marking.
.controller('complaintMarkingCtrl', function($scope, $rootScope, $http, currentMarkingService, currentUserService, factoryComplaintMarking, $ionicPopup, $state) {
 
 $scope.confirmComplaint = function(complaint) {
  $ionicPopup.confirm({
   title: 'Adicionar denúncia',
   template: 'Deseja finalizar denúncia?'
  })

  .then(function(res) {
   if (res) {
    complaint.author = currentUserService.getUserData().email;
    complaint.id_marking = currentMarkingService.getMarking().id_incidente;
    factoryComplaintMarking.save(complaint, function(result) {
     var alertPopup = $ionicPopup.alert({
      title: 'Incidente denunciado com sucesso',
      template: 'Obrigado por contribuir!'
     });
     $state.go("tabs.map")
    }, function(erro) {
     console.log(erro);
    })
   } else {
    console.log('não');
   }
  });
 };
});