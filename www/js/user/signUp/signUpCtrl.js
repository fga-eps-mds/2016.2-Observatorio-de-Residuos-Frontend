angular.module('app.controllers')
    /* Controller responsible to realize register of users
  registerEmail: Called by the button of signup.html it will receive user data and save them
                 User received here must have been vaidate by the view */
.controller('signupCtrl', function ($scope, $rootScope, $http, URL, factoryRegister, 
                                    currentUserService, $state, $ionicPopup, $ionicLoading) {

  /* In case social login button is used without register data of sign up are filled alone through service of actual user */
  $rootScope.profiles = [];

  $scope.changeColor = function(id) {
    var select = document.getElementById(id);
    select.style.color = 'black';
  }

  $http.get(URL + '/profiles')
  .success(function(content){
    angular.forEach(content, function(value, key) {
      $rootScope.profiles.push(value);

    })
  })
  .error(function(error){
    console.log("Error");
  })

  currentUser = currentUserService.getUserData();
  if(currentUser) {
    $scope.user = currentUser;
  } else {
    $scope.user = {};
  }
  $scope.secret = {};
  
  $scope.registerEmail= function(user){
      user.password_digest = String(CryptoJS.SHA256($scope.secret.password));//encryption
      factoryRegister.save(user, function(result){
        $ionicLoading.show({
          template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
        });
        $scope.invalidEmail = false;
        $scope.emailAlreadyUsed = false;
            var alertPopup = $ionicPopup.alert({
              title: 'Bem-vindo ao Observatório de Resíduos',
              //subTitle: '',
              template: 'O Observatório de Resíduos é um aplicativo que permite que você compartilhe incidentes, locais para depositar seus resíduos e ainda permite que você encontre ou divulgue seu projeto social! Sinta-se em casa!'
            });
        currentUserService.setUserData(result);
        $ionicLoading.hide();
        $state.go('tabs.home')
      }, function(error){
            if(error.status == 401){
              $ionicPopup.alert({
                template: 'Este email já está cadastrado no sistema.',
                title: 'Erro'
              });
              $scope.emailAlreadyUsed = true;
              $scope.invalidEmail = false;
            }else{
              $scope.emailAlreadyUsed = false;
              $scope.invalidEmail = true;
            }
          })
        }
      })
