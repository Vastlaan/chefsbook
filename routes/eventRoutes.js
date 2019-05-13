const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = mongoose.model('users');


module.exports =(app)=>{

	app.use(bodyParser.json())

	app.get('/api/events', (req,res)=>{
		User.findOne({_id:req.user._id})
		.then(existingUser=>res.send(existingUser.events))
		.catch(err=>{console.log(err)})
		
	})

	app.get('/api/hidePopup', (req,res)=>{
		User.findOne({_id:req.user._id})
		.then(existingUser=>{
			existingUser.showPopup=false
			existingUser.markModified('showPopup')
			existingUser.save((err,user)=>{
				if(err){
					console.log(err)
					res.status(404).json('Couldn\'t save changes')
				}
				//console.log('saved', user.schedules)
				res.send(existingUser.showPopup)
			})
			
		})
		.catch(err=>{console.log(err)})
		
	})
	
	app.post('/api/new_event',(req,res)=>{
		User.findOneAndUpdate(
			{_id:req.user._id},
			{$push: {events:req.body}},
			{new:true},
			(err, user)=>{
				if(err){
					console.log(err)
					res.status(400).json("Something went wrong")
				}else{
					res.send(user.events)
				}
			}
		)
	})

	app.post('/api/remove_event',(req,res)=>{
		
		User.findOneAndUpdate(
			{_id:req.user._id},
			{$pull: {events:req.body}},
			{new:true},
			(err, user)=>{
				if(err){
					console.log(err)
					res.status(400).json("Something went wrong")
				}else{
					res.send(user.events)
				}
			}
		)
	})
}