angular.module('starter')

//Service that find Pev searched
.service('findPevService',function($rootScope){
  var index;
  var findIndex = function(pev){
    angular.forEach($rootScope.pevs, function(value, key) {
      if(value.latitude == pev.latitude && value.longitude == pev.longitude){
        index = key;
      }
    })
  }
  var getIndex = function(){
    return index;
  }
  return{
    findIndex:findIndex,
    getIndex:getIndex
  }
})
