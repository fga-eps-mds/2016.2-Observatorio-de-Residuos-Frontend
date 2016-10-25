angular.module('app.controllers')

    .controller('mapCtrl', function(NgMap, $scope, $ionicModal, $http, $rootScope, URL) {
      NgMap.getMap().then(function(map) {
        google.maps.event.addListener(map, /*"rightclick", */function(event) {
          $scope.marking = {};
          $scope.marking.latitude = event.latLng.lat();
          $scope.marking.longitude = event.latLng.lng();
          $scope.modal.show();
          console.log("latitude "+$scope.marking.latitude +" longitude "+$scope.marking.longitude);
        });
        $rootScope.markings = [];

        $http.get(URL + '/markings')
            .success(function(content){
              angular.forEach(content, function(value, key) {
                $rootScope.markings.push(value);
              })
            })

            .error(function(data){
              console.log(data)
            });

        var modal = $ionicModal.fromTemplateUrl('views/marking/newMarking.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
        });

      })

      $scope.customIcon = {
        "scaledSize": [50, 50],
        "url": "https://lh4.ggpht.com/Tr5sntMif9qOPrKV_UVl7K8A_V3xQDgA7Sw_qweLUFlg76d_vGFA7q1xIKZ6IcmeGqg=w300"
      };
    })
