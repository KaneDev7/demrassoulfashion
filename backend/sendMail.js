const nodemailer = require('nodemailer');

 async function sendEmailToMultipleRecipients(recipients, subject, message) {
  // Créer un transporteur SMTP
  const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
      user: 'omzokane369@gmail.com',
      pass: 'ivqgkwztxosensik'
    }
  });

  // Configurer les options de l'e-mail
  let mailOptions = {
    from: 'omzokane369@gmail.com',
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