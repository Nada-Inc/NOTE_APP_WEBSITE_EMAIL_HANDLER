const express = require("express")
const cors = require("cors")
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express()
app.use(cors())
app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
    const { name, email } = req.body;

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // Define the email content
    let mailOptions = {
        from: '"NoteApp" anandhuor1997@gmail.com',
        to: email,
        subject: 'Thank You for Your Submission!',
        // text: `Dear ${name},\n\nThank you for submitting the form. We appreciate your feedback!\n\nBest regards,\nYour Name`,
        html: `
        <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333333;
        text-align: center;
      }
      p {
        color: #666666;
      }
      img {
        display: block;
        margin: 0 auto;
        max-width: 100%;
        height: auto;
      }
      /* Add more styles as needed */
    </style>
  </head>
  <body>
    <table class="container" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <img src="https://raw.githubusercontent.com/ananduremanan/Demo/main/welcome-back.png" alt="welcome" />
          <h1>Thank You For Your Interest!</h1>
          <p>Dear ${name},</p>
          <p>Thank you for submitting the form. We appreciate your feedback!</p>
          <p>Best regards,<br />Team NoteApp</p>
        </td>
      </tr>
    </table>
  </body>
</html>
  `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
            return res.status(500).send('Failed to send email');
        }
        console.log('Message sent:', info.messageId);
        res.send('Email sent successfully');
    });
});

app.listen(process.env.PORT, () => { console.log("Listeneing Now"); })
