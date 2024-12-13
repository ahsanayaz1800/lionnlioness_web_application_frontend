let nodemailer = require("nodemailer");

module.exports = {
  registerMail: (mail, username, link, plainPassword = null) => {
   
  
    // Create the base message
    var message = `
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body>
          <p>Hi ${username},</p>
          <br>
          <p>We have received your registration on Lion_n_Lioness.</p>
          <p>We hope you will find what you are looking for on our platform.</p>
          <p>To get started on Lion_n_Lioness, please make sure to validate the following link: <a href="${link}">Click here</a></p>
          <br>`;
  
    // If password is provided, add it to the email
    if (plainPassword) {
      message += `
          <p>Your account has been created with the following credentials:</p>
          <p><strong>Password:</strong> ${plainPassword}</p>
          <br>`;
    }
  
    message += `
          <p>See you soon on Lion_n_Lioness.</p>
        </body>
      </html>`;
  

    // Use SMTP transport instead of sendmail
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ahsanayaz17193@gmail.com',  // Your Gmail account
        pass: 'ruhf eosm vexj hezc'      // Your app-specific password (not regular Gmail password)
      }
    });


    transporter.sendMail(
      {
        from: "noreply@lion_n_lioness",
        to: mail,
        subject: "Welcome to Lion_n_Lioness",
        html: message,
        contentType: "text/html"
      },
      (err, info) => {
        if (err) {
          console.error("Error sending email:", err);
        } else {
          console.log("Email sent successfully:", info);
        }
      }
    );
  },

  forgotPasswordMail: (mail, username, link) => {
       
    var message =
      `
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <p>Hi ` +
      username +
      `,</p>
        <br>
        <p>We have received your password reset request on Lion_n_Lioness.</p>
        <p>Don't worry we got you covered ;)</p>
        <p>To reset your password on Lion_n_Lioness, please visit the following link: <a href="` +
      link +
      `">Click here</a></p>
        <br>
        <p>See you soon on Lion_n_Lioness.</p>
      </body>
    </html>`;

    // Use SMTP transport instead of sendmail
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ahsanayaz17193@gmail.com',  // Your Gmail account
        pass: 'ruhf eosm vexj hezc'       // Your app-specific password
      }
    });
  
    transporter.sendMail(
      {
        from: "noreply@lion_n_lioness",
        to: mail,
        subject: "Lion_n_Lioness - Reset password",
        html: message,
        contentType: "text/html"
      },
      (err, info) => {
        if (err) {
          console.error("Error sending email:", err);
        } else {
          console.log("Email sent successfully:", info);
        }
      }
    );
  }
};
