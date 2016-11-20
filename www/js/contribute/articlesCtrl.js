angular.module('app.controllers')

    //Controller responsible for articles in to contribuindo
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
