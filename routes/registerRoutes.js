const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');

const User = mongoose.model('users');

module.exports = (app) =>{

	app.use(bodyParser.json())


	app.post('/api/register', (req,res)=>{

		const { email, password } = req.body;

		const hash = bcrypt.hashSync(password)

		console.log(email,hash)

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
			return res.status(200).json(user)
		})
	})

	app.post('/api/login',passport.authenticate('local'),  (req,res)=>{

		User.findOne({email:req.body.email})
		.then((user)=>{
			if(user){
				const isValid = bcrypt.compareSync(req.body.password, user.hash);
				if(isValid){
					res.status(200).json("yes")
				}else{
					res.status(200).json(false)
				}
			}else{
				res.status(200).json("noo")
			}
		})
		.catch(err=>{
			console.log(err)
		})
	})
}