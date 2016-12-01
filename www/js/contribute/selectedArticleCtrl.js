angular.module('app.controllers')

//Controller responsible for articles in to contribuindo
    .controller('selectedArticleCtrl', function($scope, $http, URL, $rootScope, articleService, $state) {
        $scope.selected_article = articleService.getArticle();
        var dom = document.getElementById('article-text');
        dom.innerHTML = $scope.selected_article.texto_artigo;

    })
