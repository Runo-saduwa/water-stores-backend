const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = {
	// Get all Admins in the database
	getAdmins: async (req, res) => {
		try {
			const admins = await Admin.find({});

			if (!admins) {
				return res.json({ message: 'No Admins' });
			}

			res.json({ message: admins });
		} catch (e) {
			res.status.json({
				error: e
			});
		}
	},
	adminSignUp: async (req, res) => {
		const admin = await Admin.findOne({ email: req.body.email });
		if (admin) {
			return res.status(500).json({
				message: 'Already registered, try another email address'
			});
		} else {
			const hash = await bcrypt.hash(req.body.password, 8);

			const admin = new Admin({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: hash,
				createdAt: new Date().toISOString()
			});

			try {
				await admin.save();
				res.json({
					message: 'Admin Registered Successfully'
				});
			} catch (e) {
				res.json({
					error: e
				});
			}
		}
	},
	adminLogIn: async (req, res) => {
		const admin = await Admin.findOne({ email: req.body.email });

		if (!admin) {
			return res.status(500).json({
				message: 'Something went wrong'
			});
		}

		const password = await bcrypt.compare(req.body.password, admin.password);

		if (!password) {
			throw new Error({
				error: 'Unable to login'
			});
		}

		//----- Create Token ------ //
		const payload = {
			userId: admin._id,
			iat: Math.floor(Date.now() / 1000) - 30,
			exp: Math.floor(Date.now() / 1000) + 60 * 60
		};
		const token = await jwt.sign(payload, 'mysecret');
		res.json({
			message: 'Login successful',
			token
		});
	}
};
