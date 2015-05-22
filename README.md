ProGen
==================
ES6 Promise and Generator runner an utils

#under active development!

###Promisify
```javascript
var progen = require("progen");
var fs = require('fs')

var promise = progen.promisify( fs.readFile, ['/etc/passwd'] )

promise.then(data=>{
	console.log(data)
},err=> console.log("damn it! some error") )

```
###run generator
```javascript
let someLoopGenerator = function*(){
  for(var ii=0; ii<20; ii++ ){
    var code = util.randomcode(6);
    var count = yield Invitation.count({ code:code });
    if( count == 0 ){
      return yield Promise.resolve( code );
    };
  }
}

progen.run( someLoopGenerator ).then( data => {
	console.log(data)	
})





```