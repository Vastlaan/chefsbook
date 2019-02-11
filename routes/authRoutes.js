const passport = require('passport');

module.exports = (app) =>{
	
	app.get("/auth/google", passport.authenticate('google', {	//the string "google" is automaticly recognized by passport as a GoogleStrategy
		scope: ["profile", "email"]								//the scopes name are arbitrary provided by passport, so it knows which kind of data to reach during authentication
	}))

	app.get('/auth/google/callback', passport.authenticate('google'), (req,res)=>{
		res.redirect('/')						//after google accept our request from /auth/google and rediretcs us to /auth/google/callback
	})															//the passport middleware starts to work and authenticate a callback with the code
																// this happens in second part of our GoogleStrategy, where we have (accessToken)=>
																//as long as that part will not be properly solved the rest of the code will not be execute
	app.get('/api/current_user',(req,res)=>{
		if(req.user===undefined||req.user===null){
			return res.status(200).json("You're not logged in!")
		}
		res.send(req.user)
		
	})

	app.get('/api/logout',(req,res)=>{
		req.logout();				//this function is automaticlly attached to our request via passport
		res.redirect('/')			// after logout we should have no user any more, so we send up empty object
	})
}


