var nodemailer = require('nodemailer');

const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        host: 'mail.healthxpart.com',
        port: 465,
        secure: true,
        auth: {
            user: "shakil@healthxpart.com",
            pass: 'shakil52814542A'
        },tls: {
            rejectUnauthorized: false
        },
    });


    let mailOptions = {
        from: 'Task Manager MERN <shakil@healthxpart.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    
   return  await transporter.sendMail(mailOptions)

}
module.exports=SendEmailUtility