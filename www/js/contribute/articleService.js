angular.module("starter")
 
 //Service to pass clicked articles as scope variables
 .service("articleService", function() {
  var article = {};

  var getArticle = function() {
   return this.article;
  }

  var setArticle = function(paramArticle) {
   this.article = paramArticle;
  }
  
  return {
   getArticle: getArticle,
   setArticle: setArticle
  }
 })