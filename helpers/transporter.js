const nodemailer = require('nodemailer');

module.exports.transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'katherinedavenia24@gmail.com', // generated ethereal user
		pass: 'pgiazzgpynqgjfew', // generated ethereal password
	},
	tls: {
		rejectUnauthorized: false,
	},
});
