describe('findPevService', function(){
  var service;
  var $rootScope;

  beforeEach(module('starter'));
  beforeEach(inject(function(_findPevService_, _$rootScope_){
    service = _findPevService_;
    $rootScope = _$rootScope_;
  }))

  it('finds an index for an existing pev',function(){
    $rootScope.pevs = [];
    var pev={name:"PEV de Teste", paper:true, plastic:false, metal:false,glass:true, description:"Criei pra teste, karma precisava né", latitude:'-46', longitude: '30'};
    var index;
    $rootScope.pevs[0] = pev;

    service.findIndex(pev);
    index = service.getIndex();
    expect(index).toBe(0);
  })
});
