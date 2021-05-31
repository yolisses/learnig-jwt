import nodemailer from 'nodemailer';
import mailerConfig from '../../config/mailer.js';

const transport = nodemailer.createTransport(mailerConfig);

export default transport;
