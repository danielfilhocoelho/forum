const nodemailer = require('nodemailer');


const sendMail = async options =>{
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
         host: 'smtp.mailtrap.io', // Durante o desenvolvimento
         port: 25,
         auth: {
             user: '3d095a7403a7bb',
             pass: '81cb7a8ddfe65c'
         }
       
        // ACTIVATE IN GMAIL 'LESS SECURE APP' OPTION!!
    });
    // 2) Define the email options
    const mailOptions = {
        from: 'Daniel Ramos <daniel@hotmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message

    };
    // 3) Actually send the mail
    await transporter.sendMail(mailOptions);
}

module.exports = sendMail;