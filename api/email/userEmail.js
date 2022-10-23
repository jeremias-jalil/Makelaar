const nodemailer = require("nodemailer");

const { MAILUSER, MAILPASS } = process.env;

async function sendUserEmail(htmlModel, userEmail) {
  let transporter = nodemailer.createTransport({
    service: "yahoo",
    auth: {
      user: MAILUSER,
      pass: MAILPASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let info = await transporter.sendMail({
    from: MAILUSER,
    to: userEmail,
    subject: `Nuevo mensaje de Makelaar`,
    text: "Nuevo mensaje de Makelaar",
    html: htmlModel,
  });
}

module.exports = { sendUserEmail };
