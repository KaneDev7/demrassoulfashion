const nodemailer = require('nodemailer');
require('dotenv').config();

 async function getCommandFromClient(client,cammande,phone,email) {
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
    from: email,
    to: process.env.NM_EMAIL, 
    subject: `Nouvelle commande de ${client}, tel: ${phone} `,
    html: cammande
  };

  try {
    // Envoyer l'e-mail
    let info = await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé :', info.messageId);
  } catch (error) {
    console.log('Erreur lors de l\'envoi de l\'e-mail :', error);
  }
}

module.exports = getCommandFromClient;