var expect = require('chai').expect;
var progen = require('./index.js');

describe('the promisify',function(){

	it('should make node style callback return a promise',function(done){
		var fn = function(data,callback){
			return callback("some error",data)
		}

		var promise = progen.pormisify( fn, ["data"] );

		expect(typeof promise.then ).equal("function");

		promise.then(data =>{

		},error =>{
			expect( error ).equal("some error");
			done();
		})

	});



});

