const mongoose = require('mongoose');
const User = mongoose.model('users');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const keys = require('../config/keys')

aws.config.update({
	accessKeyId: keys.AWSAccessKeyId,
	secretAccessKey: keys.AWSSecretKey,
	region: "eu-west-3"
});
const s3 = new aws.S3();

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: "noirfataletestbucket",
		key: function(req, file, cb) {
			cb(null, `${req.user.googleId}/${Date.now().toString()}.jpeg`);
		}
	}),
	contentType: "image/jpeg"
});


module.exports = (app) =>{
	
	app.use(bodyParser.json());
	app.get('/api/current_user/recepies', (req,res)=>{
		// here will come logic to retrive recepies from database, but now we use our dummy  array of objects
		User.findOne({_id:req.user._id})
		.then(user=> res.send(user.recepies))
		
	})

	app.post('/api/current_user/file', upload.array("uploadFile", 1), (req,res)=>{
		res.status(200).json(`https://s3.eu-west-3.amazonaws.com/noirfataletestbucket/${res.req.files[0].key}`)
	})

	app.post('/api/current_user/recepies', (req,res)=>{

		const recept = req.body

		User.findOneAndUpdate(
			{_id:req.user._id},
			{$push: {recepies:recept}},
			{new:true},
			(err,doc)=>{
				if(err){
					console.log(err)
					res.status(400).json("Something went wrong")
				}else{
					res.send(doc)
				}
			})
	})

	app.post('/api/current_user/remove_recepie', (req,res)=>{

		const toRemove = req.body
		console.log(toRemove)
		User.findOneAndUpdate(
			{_id:req.user._id},
			{$pull: {recepies:toRemove}},
			{new:true},
			(err,doc)=>{
				if(err){
					console.log(err)
					res.status(400).json("Something went wrong")
				}else{
					res.send(doc)
				}
			})
	})

	
}