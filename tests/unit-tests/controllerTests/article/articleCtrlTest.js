describe('articlesCtrl', function() {
  var $controller;
  var $scope;
  var $rootScope;
  var $state;
  var $httpBackend;
  var articleService;
  var URL;

  beforeEach(module('starter'));

  beforeEach(inject(function(_$controller_, _$rootScope_, _$httpBackend_, 
    _$injector_, _articleService_, _$state_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    articleService = _articleService_;
    $httpBackend = _$httpBackend_;
    $state = _$state_;
    $httpBackend.when('GET', /\.html$/).respond('');
    URL = _$injector_.get('URL');
  }));

  beforeEach(function() {
    var controller = $controller('articlesCtrl', {$scope: $scope});
  });

  var articles = [
  {
    "id_artigo":3,
    "titulo_artigo":"Compostagem dentro de casa",
    "autor_original":"Edvaldo"
  },
  {
    "id_artigo":4,
    "titulo_artigo":"Sistema Nacional de Informações Sobre a Gestão dos\ Resíduos Sólidos – SINIR",
    "autor_original":"Alessandra"
  },
  {
    "id_artigo":5,
    "titulo_artigo":"Instrução Normativa IBAMA Nº 1 DE 25/01/2013 (Federal)",
    "autor_original":"Edvaldo"
  }];
  var article = articles[0];

  it('should get all articles and store then in scope after successfull\
   connection', function() {
    $rootScope.articles = [];
    $httpBackend.expectGET(URL + '/articles').respond(200, articles);
    $httpBackend.flush();
    expect($rootScope.articles).toEqual(articles);
  });

  it('should do nothing on failed connection', function() {
    $rootScope.articles = [];
    $httpBackend.expectGET(URL + '/articles').respond(400);
    $httpBackend.flush();
    expect($rootScope.articles).toEqual([]);
  });

  it("should set an article and go to it's details page when opening\
   an article", function() {
    spyOn(articleService, 'setArticle');
    spyOn($state, 'go');
    $scope.openArticle(article);
    expect(articleService.setArticle).toHaveBeenCalledWith(article);
    expect($state.go).toHaveBeenCalledWith('tabs.to-contribuindo.detailArticle');
  })
});


