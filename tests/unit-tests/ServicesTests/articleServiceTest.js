describe('articleService', function() {
  var articleService;

  beforeEach(module('starter'));

  beforeEach(inject(function(_articleService_){
    articleService = _articleService_;
  }));

  it('should get and set a user data', function() {
    var article = "";
    articleService.setArticle("Article do Amoêdo Mitoso");
    article = articleService.getArticle();
    expect(article).toBe("Article do Amoêdo Mitoso");
  });

});
