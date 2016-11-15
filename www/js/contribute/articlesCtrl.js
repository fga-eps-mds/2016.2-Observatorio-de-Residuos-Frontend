angular.module('app.controllers')

    .controller('articlesCtrl', function($scope, $http, URL, $rootScope) {
        $rootScope.articles = [];
        $http.get(URL + '/articles')
            .success(function(content){
                angular.forEach(content, function(value, key) {
                    $rootScope.articles.push(value);
                })
            })
            .error(function(error){
                console.log("Error");
            })
    })
