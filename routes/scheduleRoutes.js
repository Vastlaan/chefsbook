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

	app.post('/api/member_fetch', (req, res)=>{
		
		User.findOne({_id:req.user._id})
		.then(user=>{
			const scheduleToSend = user.schedules.find(each => each.week===req.body.week)

			if(scheduleToSend) {
				scheduleToSend.data.map(person=>{
					if(person.name===req.body.name){
						return res.send(person.days)
					}
				})
			}else{
				user.schedules.map(each=>{		
					if(each.week === 0){
						each.data.map(person=>{
							if(person.name===req.body.name){
								return res.send(person.days)
							}
						})
					}
				})	
			}
		
		})
		.catch(err=>res.send(err))
	})

	app.post('/api/delete_member', (req, res)=>{

		User.findOne({_id:req.user._id})
		.then(user=>{

			let index = -1
			user.schedules.map(each=>{
				if(each.week === 0){
					each.data = each.data.filter(e=>e.name!==req.body.name)
				}
			})
			user.markModified('schedules')
			user.save((err,user)=>{
				if(err){
					console.log(err)
					res.status(404).json('Couldn\'t save changes')
				}
				res.send(user.schedules)
			})
		})
		.catch(err=>res.send(err))
	})

	app.post('/api/add_member', (req,res)=>{
		
		User.findOne({_id:req.user._id})
		.then(user=>{ 
			if(user.schedules.length>0){

				let newData = false

				user.schedules.map(each=>{
					if(each.week===req.body.week){
						newData = each.data.concat(req.body.data)
					}
				})
				
				if(!newData[0]){
					user.schedules.push(req.body)
					user.save((err,user)=>{
						if(err){
							console.log(err)
							res.status(404).json('Couldn\'t save changes')
						}
						res.send(user.schedules)
					})
				}else{
					
					user.schedules.find(x=>x.week===req.body.week).data = [].concat.apply([],newData)
					user.markModified('schedules')
					user.save((err,user)=>{
						if(err){
							console.log(err)
							res.status(404).json('Couldn\'t save changes')
						}
						//console.log('saved', user.schedules)
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

	app.post('/api/change_schedule', async (req, res)=>{
		
		let weekExist = false

		await User.findOne({_id: req.user._id})
		.then(user=>{ 
			user.schedules.map(each=>{
							//we check of schedule for weekend exist assuming it doesn't
				if(each.week===req.body.week){
					weekExist=true				// it exists
					each.data.map(particular=>{
						if(particular.name===req.body.member){
							particular.days[req.body.weekday]=req.body.hours
							user.markModified('schedules')
							user.save((err,user)=>{
								if(err){
									console.log(err)
									return res.status(404).json('Couldn\'t save changes')
								}
								return res.send(user.schedules)
							})
							//res.status(200).json('Ok')
						}
					})
				}
			})
		})

		if(!weekExist){

			User.findOne({_id: req.user._id})
				.then(user=>{
					let defaultWeek = user.schedules.find((each)=>{
						return each.week===0
					})
					const newData = defaultWeek.data.map(each=>{
						if(each.name===req.body.member){
							each.days[req.body.weekday]=req.body.hours
						}
						return each
					})

					const newWeek = {
						week: req.body.week,
						data: newData
					}
		
					user.schedules.push(newWeek)
					user.markModified('schedules')
					user.save((err,user)=>{
						if(err){
							console.log(err)
							return res.status(404).json('Couldn\'t save changes')
						}
						return res.send(user.schedules)
					})
				})
		}
	})
}