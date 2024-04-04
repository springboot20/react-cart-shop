const MailGen = require('mailgen');
const nodemailer = require('nodemailer');

/**
 *
 * @param {{email:string, subject:string, mailContent:MailGen.Content}} options
 */

const sendMail = async (options) => {
  const mailGenerator = new MailGen({
    theme: 'default',
    product: {
      name: 'E-commerce',
      link: 'https://github.com/spingboot20',
    },
  });

  const emailBody = mailGenerator.generate(options.mailContent);
  const emailText = mailGenerator.generatePlaintext(options.mailContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mail = {
    from: 'mail.freeapi@gmail.com',
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailBody,
  };

  await transporter.sendMail(mail);
};

/**
 *
 * @param {string} username
 * @param {string} verificationUrl
 * @returns {MailGen.Content}
 * @description It designs the email verification mail
 */
const emailVerificationMailGenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our app! We're very excited to have you on board.",
      action: {
        instructions: 'To verify your email please click on the following button:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Verify your email',
          link: verificationUrl,
        },
      },
      outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

/**
 *
 * @param {string} username
 * @param {string} verificationUrl
 * @returns {MailGen.Content}
 * @description It designs the forgot password mail
 */
const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: 'We got a request to reset the password of our account',
      action: {
        instructions: 'To reset your password click on the following button or link:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Reset password',
          link: passwordResetUrl,
        },
      },
      outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

module.exports = { sendMail, emailVerificationMailGenContent, forgotPasswordMailGenContent };
