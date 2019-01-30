const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) =>{

	app.use(bodyParser.json())

	app.get('/api/schedule', (req, res)=>{
		User.findOne({_id:req.user._id})
		.then(user=>{
			
			res.status(200).json(user.schedules)
		})
		.catch(err=>res.send(err))
	})

	app.post('/api/add_member', (req,res)=>{
	
		User.findOne({_id:req.user._id})
		.then(user=>{ 
			if(user.schedules.length>0){
				const newData = user.schedules.map(each=>{
					if(each.week===req.body.week){
						return each.data.concat(req.body.data)
					}else{
						return false
					}
				})
				if(!newData){
					user.schedules.push(req.body)
					user.save((err,user)=>{
						if(err){
							console.log(err)
							res.status(404).json('Couldn\'t save changes')
						}
						res.send(user.schedules)
					})
				}else{
					user.schedules.find(x=>x.week===req.body.week).data = newData
					user.markModified('user.schedules')
					user.save((err,user)=>{
						if(err){
							console.log(err)
							res.status(404).json('Couldn\'t save changes')
						}
						console.log('saved', user.schedules)
						res.send(user.schedules)
					})
				}
			}
			else{
				user.schedules.push(req.body)
				user.save((err,user)=>{
					if(err){
						console.log(err)
						res.status(404).json('Couldn\'t save changes')
					}
					res.send(user.schedules)
				})	
			}
		})
		.catch(err=>res.send(err))
	})	
}