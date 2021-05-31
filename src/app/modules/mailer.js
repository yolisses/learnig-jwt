import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

import mailerConfig from '../../config/mailer.js';

const transport = nodemailer.createTransport(mailerConfig);

transport.use(
	'compile',
	hbs({
		viewEngine: 'handlebars',
		viewPath: path.resolve('./src/resources/mail/'),
		extName: '.html',
	})
);

export default transport;
