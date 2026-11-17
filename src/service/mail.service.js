const fs = require('fs')
const path = require('path')
const transporter = require('../config/mail.config')

const {GMAIL_USER, APP_NAME} = process.env;

exports.sendVerificationEmail = async(to, firstName, code) => {
    const templatePath = path.join(__dirname, '..', 'templates', 'verify-email.html')

    let html = fs.readFileSync(templatePath, 'utf8')

    html = html
    .replace('{{fullname}}', firstName)
    .replace('{{code}}', code)
    .replace('{{year}}', new Date().getFullYear())

    const mailOptions = {
        from: `${APP_NAME} <${GMAIL_USER}>`,
        to,
        subject: 'Verify Your Email',
        html
    };

    return transporter.sendMail(mailOptions)

}