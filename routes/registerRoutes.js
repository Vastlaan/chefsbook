const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");

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
					async function main(){

					  // Generate test SMTP service account from ethereal.email
					  // Only needed if you don't have a real mail account for testing
					  let account = await nodemailer.createTestAccount();

					  // create reusable transporter object using the default SMTP transport
					  let transporter = nodemailer.createTransport({
					    host: "smtp.ethereal.email",
					    port: 587,
					    secure: false, // true for 465, false for other ports
					    auth: {
					      user: account.user, // generated ethereal user
					      pass: account.pass // generated ethereal password
					    }
					  });

					  // setup email data with unicode symbols
					  let mailOptions = {
					    from: '"Chefsbook" <no-reply@chefsbook.com>', // sender address
					    to: `${user.email}`, // list of receivers
					    subject: "Confirmation of new account registration.", // Subject line
					    text: `Welcome to Chefsbook ${user.email}!`, // plain text body
					    html: `<div>Welcome to Chefsbook ${user.email}!</div>` // html body
					  };

					  // send mail with defined transport object
					  let info = await transporter.sendMail(mailOptions)

					  console.log("Message sent: %s", info.messageId);
					  // Preview only available when sending through an Ethereal account
					  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

					  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
					  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
					}
					main().catch(console.error);
					return res.status(200).json(`You succesfully created new account! Welcome ${user.email}!`)
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