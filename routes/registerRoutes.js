const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');

const User = mongoose.model('users');

module.exports = (app) =>{

	app.use(bodyParser.json())


	app.post('/api/register', (req,res)=>{

		const { email, password } = req.body;

		User.findOne({email:req.body.email})
		.then((user)=>{
			if(user){
				return res.status(409).json('User Email already exist!')
			}else{
				const hash = bcrypt.hashSync(password)

				new User({			// otherwise we create a new Instance of our Collection (user inside of collection) with appropriate
					googleId: "",		// with appropriate already defined in our Schema key:value pairs
					name: "",
					surname: "",
					email: email,
					hash: hash
				})
				.save()
				.then(user=>{
					console.log(user)
					return res.status(200).json(`You succesfully created new account! Welkom ${user.email}!`)
				})
			}
		})
	})

	app.post('/api/login',passport.authenticate('local'),  (req,res)=>{

		User.findOne({email:req.body.email})
		.then((user)=>{
			if(user){
				
				const isValid = bcrypt.compareSync(req.body.password, user.hash);
				if(isValid){
					return res.status(200).json("yes")
				}else{
					return res.status(400).json('Wrong password!')
				}
			}else{
				
				return res.status(400).json("Ups, something went wrong!")
			}
		})
		.catch(err=>{
			return res.status(400).json("Ups, something went wrong!")
		})

		
	})
}