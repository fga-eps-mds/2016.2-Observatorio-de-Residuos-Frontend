angular.module("app.controllers")

.controller("editPevCtrl", function($scope, $http, URL){
    $http.get(URL+"/pevs/getonepev")
    .success(function(pev){
      console.log(pev);
      $scope.pev = pev;
    })
    .error(function(result){
      console.log("ERRROOOWWW");
    })
})
