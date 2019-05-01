'use strict'

const nodemailer = require('nodemailer');
const emailconf = require('../config/Email');

function testEmail(req, res) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: emailconf.user,
            pass: emailconf.password
        }
    });

    const mailOptions = {
        from: emailconf.user,
        to: 'johansantiagopinillauribe@gmail.com',
        subject: 'Email Prueba Node',
        html: `<!DOCTYPE html> <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="x-apple-disable-message-reformatting"><title></title>
          <link href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700" rel="stylesheet">
          <style>
            html, body { margin: 0 auto !important; padding: 0 !important; height: 100% !important; width: 100% !important; background: #f1f1f1; }
            * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }div[style*="margin: 16px 0"] { margin: 0 !important; }
            table, td { mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; }table { border-spacing: 0 !important; border-collapse: collapse !important; table-layout: fixed !important; margin: 0 auto !important; }
            img { -ms-interpolation-mode: bicubic; }
            a { text-decoration: none; }
            *[x-apple-data-detectors],
            .unstyle-auto-detected-links *, .aBn { border-bottom: 0 !important; cursor: default !important; color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important;line-height: inherit !important; }
            .a6S { display: none !important; opacity: 0.01 !important; }
            .im { color: inherit !important; } img.g-img+div { display: none !important; }
            @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
              u~div .email-container {min-width: 320px !important; } }
            @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
              u~div .email-container {min-width: 375px !important;}}
            @media only screen and (min-device-width: 414px) {
              u~div .email-container {min-width: 414px !important;}}
          </style>
          <style>
            .bg_white {background: #ffffff; }.bg_black {background: #000000; }
            .email-section {padding: 2.5em;}
            h1, h2, h3, h4, h5, h6 { font-family: 'Work Sans', sans-serif; color: #000000; margin-top: 0; font-weight: 400;}
            body {font-family: 'Work Sans', sans-serif; font-weight: 400; font-size: 15px; line-height: 1.8; color: rgba(0, 0, 0, .4);}
            a {color: #2f89fc; }
            .logo h1 { margin: 0;}.logo h1 a {color: #000000; font-size: 20px; font-weight: 700;text-transform: uppercase;font-family: 'Poppins', sans-serif;}
            .hero {position: relative;z-index: 0;}.hero .text {color: rgba(0, 0, 0, .3);}.hero .text h2 {color: #000;font-size: 30px;margin-bottom: 0;font-weight: 300;}.hero .text h2 span {font-weight: 600;color: #2f89fc;}
            .footer {color: rgba(255, 255, 255, .5);}
            .footer .heading {color: #ffffff;font-size: 20px;}.footer ul {margin: 0;padding: 0;}.footer ul li {list-style: none;margin-bottom: 10px;}.footer ul li a {color: rgba(255, 255, 255, 1);}
            @media screen and (max-width: 500px) {}
          </style>
        </head>
        <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;">
          <center style="width: 100%; background-color: #f1f1f1;">
            <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
              &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
            </div>
            <div style="max-width: 600px; margin: 0 auto;" class="email-container">
              <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                <tr>
                  <td valign="top" class="bg_white" style="padding: 1em 2.5em;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td class="logo" style="text-align: center;">
                          <h1><a href="#">ADDMIN</a></h1>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td valign="middle" class="hero hero-2 bg_white" style="padding: 4em 0;">
                    <table>
                      <tr>
                        <td>
                          <div class="text" style="padding: 0 3em; text-align: center;">
                            <h2>Bienvenido a nuestro sistema de <span>Gestion</span> &amp; <span>Control</span> de conjuntos
                              residenciales y propiedades horizontales</h2>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              </td>
              </tr>
              </table>
              </td>
              </table>
              <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                style="margin: auto;">
                <tr>
                  <td valign="middle" class="bg_black footer email-section">
                    <table>
                      <tr>
                        <td valign="top" width="33.333%" style="padding-top: 20px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="text-align: left; padding-right: 10px;">
                                <h3 class="heading">Nosotros</h3>
                                <p>Somos un proyecto enfocado en la gestion y administracion de conjuntos y propiedades
                                  horizontales.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td valign="top" width="33.333%" style="padding-top: 20px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                                <h3 class="heading">Contacto</h3>
                                <ul>
                                  <li><span class="text">Bogotá - Colombia Cl. 24 #27a - 62</span></li>
                                  <li><span class="text">+57 322 9024205</span></a></li>
                                </ul>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td valign="middle" class="bg_black footer email-section">
                    <table>
                      <tr>
                        <td valign="top" width="33.333%">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="text-align: left; padding-right: 10px;">
                                <p>&copy; 2019 ADDMIN. Todos los derechos reservados.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </center>
        </body>
        </html>`
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