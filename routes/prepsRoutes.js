const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) =>{


	app.post('/api/submitPreps', (req,res)=>{
		const {preps, date} = req.body

		const dbFormat = {
			preps,
			date
		}

		User.findOneAndUpdate(
			{_id: req.user._id},
			{$push: {preps:dbFormat}},
			{new:true},
			(err, user)=>{
				if(err){
					console.log(err)
					res.status(400).json("Something went wrong")
				}else{
					res.send(user.preps)
				}
			}
		)
		
		
	})

	app.post('/api/deletePrep', (req,res)=>{
		console.log(req.body)
		User.findOne({_id:req.user._id})
			.then(user=>{

				const newPreps = user.preps.filter(prep=>{
					console.log(prep.date===req.body.date)
					console.log(prep.preps[0]===req.body.preps[0])
					return prep.date===req.body.date && prep.preps[0]!==req.body.preps[0]
				})

				user.preps = newPreps
				user.markModified('preps')
				user.save((err,user)=>{
					if(err){
						console.log(err)
						res.status(404).json('Couldn\'t save changes')
					}
					res.send(user.preps)
				})
			})
	})

	app.get('/api/getPreps',(req,res)=>{
		User.findOne({_id:req.user._id})
		.then(user=>{
			return res.send(user.preps)
		})
		.catch(err=>{
			return res.status(400).json('Ups, something went wrong.')
		})
	})
}