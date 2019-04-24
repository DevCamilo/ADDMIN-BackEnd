'use strict'

const nodemailer = require('nodemailer');
const emailconf  =  require('../config/Email');

function testEmail(req, res) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: emailconf.user,
            pass: emailconf.password
        }
    });

    var mailOptions = {
        from: 'alondres15@gmail.com',
        to: 'nrodriguez786@misena.edu.co',
        subject: 'Email Prueba Node',
        html: `le`
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
            res.status(200).send({ status: false, message: 'Error en el envío' });
        } else {
            res.status(200).send({ status: true, message: 'Mensaje exitoso' });
        }
    })
}

module.exports = {
    testEmail
}