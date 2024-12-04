const nodemailer = require('nodemailer');
require('dotenv').config()
const { EMAIL_ID, PASS, ADDRESS } = process.env
const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: EMAIL_ID,
        pass: PASS
    }
})

exports.sendEmail = (to, subject, htmlContent) => {
    const mailOption = {
        from: EMAIL_ID,
        to,
        subject,
        html: htmlContent,
    }
    return transport.sendMail(mailOption)

}

