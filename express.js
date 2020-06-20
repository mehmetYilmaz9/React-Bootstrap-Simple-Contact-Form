var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
//var smtpTransport = require('nodemailer-smtp-transport');
var cors = require('cors');
const creds = require('./config');


////GMAIL SMTP
nodemailer.createTestAccount((err, account) => {
  let transporter = nodemailer.createTransport({
      host: 'smtp.googlemail.com', // Gmail Host
      port: 465, // Port
      secure: true, // this is true as port is 465
      auth: {
        ///In the config.js, please add your mail and password 
        user: creds.USER,
        pass: creds.PASS
      }
  });

 // var transporter = nodemailer.createTransport(transport)

  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });
  
  router.post('/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n message: ${message} `
  
    var mail = {
      from: name,
      ///your mail recipient
      to: 'Your email',
      subject: 'New Message from Contact Form',
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
  }) 
  
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use('/', router)
  app.listen(3002)

});