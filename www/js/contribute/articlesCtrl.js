angular.module('app.controllers')

//Controller responsible for articles in to contribuindo
.controller('articlesCtrl', function($scope, $http, URL, $rootScope, articleService, $state) {
 $rootScope.articles = [];
 $http.get(URL + '/articles')
  .success(function(content) {
   angular.forEach(content, function(value, key) {
    $rootScope.articles.push(value);
   })
  })
  .error(function(error) {
   console.log("Error");
  })

 $scope.openArticle = function(article) {
  articleService.setArticle(article);
  $state.go("tabs.to-contribuindo.detailArticle");
 }
})
