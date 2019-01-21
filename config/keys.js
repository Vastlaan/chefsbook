if(process.env.NODE_ENV==='production'){
	//we are in production so take keys from envarimental variables
	module.exports = require('./prod')
}else{
	//we are in dev mode grab keys from config/dev.js file
	module.exports= require('./dev');
}