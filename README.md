ProGen
==================
ES6 Promise and Generator runner an utils, warning this module is ES6 only, you need use your own transpiler or pollyfill

#under active development!

###Promisify
the Progen.promisify will make a normal node style callback: callback(err, data ) into a promise; it will be useful when you want to do some sequencial async operation, but to get more controll over the async stuff, use Progen.run will be even better!

```javascript
var progen = require("progen");
var fs = require('fs')

var promise1 = progen.promisify( fs.readFile, ['/some/file'] )
var promise2 = progen.promisify( fs.readFile, ['/another/file'] )

promise2
	.then( data => {
		console.log(data)
		return promise2;
	},err=> console.log("damn it! some error") )
	.then( data => console.log(data), error => doSomething() );

```
###run generator
make complicated async operation much easier, you can think of Progen.run is a lite version of the [co](https://www.npmjs.com/package/co) library

```javascript
let someLoopGenerator = function*(){
  for(var ii=0; ii<20; ii++ ){
    var code = util.randomcode(6);
    var count = yield Invitation.count({ code:code });
    if( count == 0 ){
    	// this return is used to end for loop
    	// you don't need use return, the last yield value will be the promise;
      return yield Promise.resolve( code );
    };
  }
}

progen.run( someLoopGenerator ).then( data => {
	console.log(data)	
})

```

###more util is under development.......
