'use strict'

const nodeMailer = require('nodemailer');
const emailConf = require('../config/Email');
const welcomeEmail = require('../templates/WelcomeEmailTemplate');

function welcomeEmailMessage(req, res) {
    const user = req.body;
    const transporter = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            user: emailConf.user,
            pass: emailConf.password
        }
    });

    const mailOptions = {
        from: emailConf.user,
        to: user.email,
        subject: `Bienvenido ${user.name} a ADDMIN`,
        html: welcomeEmail.welcomTemplate(user)
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Error en el envío del correo' });
        } else {
            res.status(200).send({ status: true, message: 'Correo enviado exitosamente' });
        }
    })
}

module.exports = {
  welcomeEmailMessage
}