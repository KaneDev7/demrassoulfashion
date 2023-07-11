const nodemailer = require('nodemailer');
require('dotenv').config();

 async function sendEmailToMultipleRecipients(recipients, subject, message) {
  // Créer un transporteur SMTP
  const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
      user: process.env.NM_EMAIL,
      pass: process.env.NM_PASSWORD
    }
  });

  // Configurer les options de l'e-mail
  let mailOptions = {
    from: 'sidilefou56@gmail.com',
    to: recipients.join(', '), // Séparez les destinataires par une virgule
    subject: subject,
    text: message
  };

  try {
    // Envoyer l'e-mail
    let info = await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé :', info.messageId);
  } catch (error) {
    console.log('Erreur lors de l\'envoi de l\'e-mail :', error);
  }
}

module.exports = sendEmailToMultipleRecipients;