describe('selectedArticleCtrl', function() {
  var $controller;
  var $scope;
  var $rootScope;
  var articleService;

  beforeEach(module('starter'));

  beforeEach(inject(function(_$controller_, _$rootScope_, _articleService_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    articleService = _articleService_;
  }));

  var article = {
    "id_artigo":3,
    "titulo_artigo":"Compostagem dentro de casa",
    "autor_original":"Edvaldo"
  }
  beforeEach(function() {
    articleService.setArticle(article);
    spyOn(articleService, 'getArticle').and.callThrough();
    var controller = $controller('selectedArticleCtrl', {$scope: $scope});
  });

  it('should store an article from service to scope', function() {
    expect(articleService.getArticle).toHaveBeenCalled();
    expect($scope.selected_article).toEqual(article)
  });

});