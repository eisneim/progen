/**
 * make node style callback become a promise;
 * @param  {Function} fn invok node style callback done(err,param,param);
 * @return {promise}   
 */
exports.promisify = function( fn ,args,ctx ){
	var slice = Array.prototype.slice;

	return new Promise((resolve,reject)=>{
		var cb = function(){
			if( Array.isArray(arguments) ){
				if( arguments[0] ) return reject( arguments[0] );
				var results = slice(arguments,1);

				resolve( results.length>1?results : results[0] )

			}else if(typeof arguments === 'object'){ // object
				if( arguments['0'] ) return reject( arguments[0] );
				results = [];
				for(var pp in arguments ){
					if( pp != '0') results.push(arguments[pp] )
				}

				resolve( results.length>1?results : results[0] );

			}else{
				resolve( arguments );
			}
			
		}

		args.push( cb );

		fn.apply( ctx , args )
	});
}
/**
 * run async promise in a generator, like this:
	  try{
			var price = yield getStockPriceP();
			if( price > 45 ){
				yield executeTradeP();
			}else{
				console.log('trade not made');
			}
		}catch(e){
			console.log(e);
		}
 * @param  {*function} generator  
 * @return {}        
 */

exports.run = function( generator ){
	if(!isGeneratorFunction(generator)) 
		throw TypeError('"run()" method only accept a generator function');

	var iterator = generator();

	return new Promise((resolve,reject)=>{
		var lastValue;
		var process = ( next ) => {

			if( next.done ) return resolve( lastValue );

			next.value.then( value => {
					lastValue = value;
					process( iterator.next( value ) )
			}, error => reject( error ) )
		}

		process( iterator.next() );

	});
}

/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
function isGeneratorFunction(obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
  return isGenerator(constructor.prototype);
}
