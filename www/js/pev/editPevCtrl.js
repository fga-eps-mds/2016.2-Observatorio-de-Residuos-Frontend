angular.module("app.controllers")

.controller("editPevCtrl", function($scope, $http, factoryEditPEV, $state, $rootScope, $ionicPopup, URL){
    var index;
    $http.get(URL+"/pevs/getonepev")
    .success(function(pev){
      console.log(pev);
      $scope.pev = pev;
      // index = $rootScope.pevs.indexOf(pev);   
    })

    .error(function(result){
      console.log("error");
    });  

    $scope.editPEV = function(pev){
   //  	console.log($rootScope.pevs[index]);
	 	// $rootScope.pevs[index] = pev;

    	factoryEditPEV.save(pev, function(result){
    		var alertPopup = $ionicPopup.alert({
              title: 'PEV editada com sucesso',
              template: 'Obrigado por contribuir!'
            });

    		$state.go("tabs.map")

		}, function(erro){
			console.log(erro);
		})
    }
})
