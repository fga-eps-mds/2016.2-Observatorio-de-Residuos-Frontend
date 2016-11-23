angular.module('app.controllers')

//Controller responsible for articles in to contribuindo
.controller('selectedArticleCtrl', function($scope, $http, URL, $rootScope, articleService, $state) {
 $scope.selected_article = articleService.getArticle();
})
