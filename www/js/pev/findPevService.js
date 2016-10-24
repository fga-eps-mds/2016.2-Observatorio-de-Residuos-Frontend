angular.module('starter')

.service('findPevService',function($rootScope){
  var index;
  var findIndex = function(pev){
    angular.forEach($rootScope.pevs, function(value, key) {
      if(value.latitude == pev.latitude && value.longitude == pev.longitude){
        console.log(value)
        console.log(key)
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
