const express = require("express");
const passport = require('passport'); ///this will be deleted soon
const mongoose = require('mongoose');
const app = express();
const keys = require('./config/keys');
const cookieSession = require('cookie-session')

mongoose.connect(keys.mangoURI);	// here we pass url to our database togheter with username and password. We can find it in our key values

// middleware before routes
app.use(cookieSession({			// this stores all our data in the cookie itself. We can store mak 4KB of data in session
	maxAge: 30*24*60*60*1000,	// to store more data we can use express-session which use an apart data base to store our data
	keys: [keys.cookieKey]
}))
app.use(passport.initialize());	// we have to initialize passport to make express aware of it
app.use(passport.session());	// this looks into req.session and look for req.session.password - there you find an id from MangoDB, which we
								// assign it to via passport.deserializeUser() function
require('./models/userModel');

require('./services/passport'); 	// in this file we serve all code related to passport
									// some of the set up in authRoutes are taken directly from passport (like GoogleStartegy, which is called in passport.authenticate('google')) 
require('./routes/authRoutes')(app)	// here we have our routs related to google authentication process

require('./routes/recepiesRoutes')(app)

require('./routes/eventRoutes')(app)

if(process.env.NODE_ENV === "production"){
	
	app.use(express.static("client/build"));

	const path = require('path');
	app.get('*', (req,res)=>{
		res.sendFile(path.resolve(__dirname,'client','build', 'index.html'))
	})
	
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
	console.log(`App is running on port: ${PORT}`)
})