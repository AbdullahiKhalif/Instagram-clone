import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abdullahikhalif115@gmail.com',
    pass: 'iwhphccqwfjintwb',
  },
});

const sendEmailVerificationToken = (to, verificationLink) => {
  const mailOptions = {
    from: 'abdullahikhalif115@gmail.com',
    to,
    subject: 'Instagram Verification Email',
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
              color: #3498db;
            }
            p {
              line-height: 1.6;
            }
            a {
              color: #3498db;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Instagram Verification Email</h2>
            <p>Click the link below to verify your account:</p>
            <p><a href="${verificationLink}"> Verify Your User </a></p>
          </div>
        </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Failed to send email verification:', err);
      return 'Failed to send email verification';
    } else {
      console.log('Email sent successfully:', info);
      return 'Successfully sent email verification';
    }
  });
};

export default sendEmailVerificationToken;
