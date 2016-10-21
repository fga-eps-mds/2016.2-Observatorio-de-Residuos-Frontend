angular.module("app.controllers")

.controller("editPevCtrl", function($scope, $http, URL){
    //$scope.pev = {}
    $http.get(URL+"/pevs/getonepev")
    .success(function(pev){
      console.log(pev);
      $scope.pev = pev  ;
      //$scope.pev = result;
    })
    .error(function(result){

    })
})
