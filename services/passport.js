const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;	// Use only the Strategy module from passprt-google-oauth20
const keys = require('../config/keys');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('users');	// when we provide one argument we want to fetch existing model (Collection) and below we create Instance of it
// to use passport at all in our express app we have to initialize it - we do it in index.js 
const bcrypt = require('bcrypt-nodejs');


passport.serializeUser((user, done) => { //the user is exactly the same user which is created in GoogleStrategy second arrow function
    done(null, user.id);					// so user = existingUser if the user already existed in our database
});										// or user = user (the returened user from Promise when we created a new user in our database)
					// the user.id = the .id is NOT  profile.id from Google. This id is a unique id created by mangoDB when we first created a record
					// so the user.id === user._id.$oid  look in mongoDB in case you forget what it is

passport.deserializeUser((id, done) => {	// this id is exact the same as we passed to passport in serializeUser done(null,user.id)
    User.findById(id).then(user=>{ done(null,user)})	// we find a user in our database by id (MangoDB id) and send it back to passport
});														// to infrom passport which user we want to log out and end the cookie session


passport.use(new GoogleStrategy({
	//first object is necessary to go into oAuth flow, as a response google send us code to defined callbackURL (which has to match to adress on our API)
	// our API is set up UNIQUE for each App on developers.console.google  we signed up to GOOGLE+ API !!!!! It's OAuth20 !!!!
	// GOOGLE+ API
	clientID : keys.googleClientID,
	clientSecret: keys.googleSecretKey,
	callbackURL: '/auth/google/callback',
	userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
	proxy:true						//this allow to trust heroku proxy where we deployed our app
	},
	//second part is an arrow function which handles a callback responded code from google and exchanges it with google for actual data about user (profile,email)
	(accessToken, refreshToken, profile, done )=>{
		User.findOne({googleId:profile.id})
		.then(existingUser=>{		
			if(existingUser){		// if the instance of the User with exact googleId already exist, we know the user is signed up already
			 	done(null, existingUser)
			}else{
				new User({			// otherwise we create a new Instance of our Collection (user inside of collection) with appropriate
					googleId: profile.id,		// with appropriate already defined in our Schema key:value pairs
					name: profile.name.givenName,
					surname: profile.name.familyName,
					email: profile.emails[0].value
				}).save()			// we always MUST save a new Instance otherwise it lives only in mongoose and won't be saved in MangoDB
				.then(user=>{		//after saving new Instance we get back a saved data from mongoDB, so we can pass them to our done function
					done(null,user)	///this has to be called to let know Google that we finished with authentication flow
				})
			}
		})		
	}
))

//local strategy

passport.use('local', new LocalStrategy(
	{
		usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },

  function(req, email, password, done){
    User.findOne({email:email})
		.then((user)=>{
			if(user){
				const isValid = bcrypt.compareSync(password, user.hash);
				if(isValid){
					return done(null,user)
				}else{
					done(null,false)
				}
			}else{
				done(null,false)
			}
		})
		.catch(err=>{
			console.log(err)
		})
  }
));

