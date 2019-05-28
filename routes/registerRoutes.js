const passport = require("passport");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const sgTransport = require('nodemailer-sendgrid-transport');
const keys = require("../config/keys");

const User = mongoose.model("users");

module.exports = app => {
	app.use(bodyParser.json());

	app.post("/api/register", (req, res) => {
		const { email, password } = req.body;

		User.findOne({ email: req.body.email }).then(user => {
			if (user) {
				return res.status(409).json("User Email already exist!");
			} else {
				const hash = bcrypt.hashSync(password);

				new User({
					// otherwise we create a new Instance of our Collection (user inside of collection) with appropriate
					googleId: "", // with appropriate already defined in our Schema key:value pairs
					name: "",
					surname: "",
					email: email,
					hash: hash
				})
					.save()
					.then(user => {

						const options = {
						    auth: {
						        api_key: keys.sendgridApiKey
						    }
						}

						const mailer = nodemailer.createTransport(sgTransport(options));
				
						const mail = {
							from: 'no-reply@chefsbook.org', // sender address
							to: `${user.email}`, // list of receivers
							subject: "Confirmation of new account registration.", // Subject line
							text: "Thank you for registration!",
							html: `	<div>
										<h1 style="text-align:center">Welcome to Chefsbook ${user.email}!</h1>
										<p style="text-align:center">We are very happy you joined our service.</p>
										<p style="text-align:center">If you have any questions or you need a help with using our website. Please <a href='https://www.chefsbook.org/author'>contact us</a>.</p>
									</div>` // html body
						};

						mailer.sendMail(mail, function(err, res) {
						    if (err) { 
						        console.log(err) 
						    }
						    console.log(`Message sent: ${res}`);
						});

						return res
							.status(200)
							.json(
								`You succesfully created new account! Welcome ${
									user.email
								}! Click Log in to start using our services.`
							);
					});
			}
		});
	});

	app.post("/api/login", passport.authenticate("local"), (req, res) => {
		User.findOne({ email: req.body.email, googleId:"" })
			.then(user => {
				
				if (user) {
					const isValid = bcrypt.compareSync(
						req.body.password,
						user.hash
					);
					if (isValid) {
						return res.status(200).json("yes");
					} else {
						return res.status(400).json("Wrong password!");
					}
				} else {
					return res.status(400).json("Ups, something went wrong!!");
				}
			})
			.catch(err => {
				return res.status(400).json("Ups, something went wrong!");
			});
	});
};
