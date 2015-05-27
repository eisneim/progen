var expect = require('chai').expect;
var progen = require('./index.js');

describe('the promisify',function(){

	it('should make node style callback return a promise',function(done){
		var fn = function(data,callback){
			return callback("some error",data)
		}

		var promise = progen.pormisify( fn, ["data"] );

		expect(typeof promise.then ).to.equal("function");

		promise.then(data =>{

		},error =>{
			expect( error ).to.equal("some error");
			done();
		})

	});



});

describe("the Progen.run",function(){
	var fn = function(){return '' }

	var gen = function*(){
		var aa = yield Promise.resolve("some data");// pass this around
		var bb = yield new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve( aa );
			},100)
		})
		// no need to return anything ,the last yield value will be the promise;
		// return bb
	}

	it("should throw error if no generator is given",function(done){
		expect( progen.run(fun) ).to.throw(TypeError)
	})

	it("should run all yield in generator and return the last value as promise",function(done){
		var promise = progen.run( gen )
		promise.then(data => {
			expect(data).to.equal("some data");

		})
	})

})