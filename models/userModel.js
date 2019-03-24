const mongoose = require('mongoose');

const { Schema } = mongoose; 	// this is equivalent to const Schema = mongoose.Schema

const usersSchema = new Schema({
	googleId: String,			//it is good to know that we can freely add or substract properities whenever we want
	name: String,
	surname: String,
	email: String,
	hash:{type:String, 'default':""},
	recepies: {type: Array, 'default':[]},
	events: {type:Array, 'default':[]},
	schedules: {type:Array, 'default':[]},
	preps: {type:Array, 'default':[]}
})

mongoose.model("users", usersSchema)	// when we provide two arguments to mongoose.model, we inform mongoose that we want to create a new Collection
										// so we create a new Collection inside our mongoose and we pass to it Schema defined above 