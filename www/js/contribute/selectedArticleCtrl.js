angular.module('app.controllers')

.controller('selectedArticleCtrl', function($scope, articleService) {
  $scope.selected_article = articleService.getArticle();
  var dom = document.getElementById('article-text');
  console.log(dom);
  dom.innerHTML = $scope.selected_article.texto_artigo;

})
