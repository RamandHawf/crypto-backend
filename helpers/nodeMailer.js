const nodemailer = require("nodemailer");



const sendMail = async (emailBody) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  // let transporter = nodemailer.createTransport({
  //     host: "smtp.ethereal.email",
  //     port: 587,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //         user: testAccount.user, // generated ethereal user
  //         pass: testAccount.pass, // generated ethereal password
  //     },
  // });
  console.log("Email is ", process.env.EMAIL, "Password is :", process.env.PASSWORD)
  // let transporter = nodemailer.createTransport({
  //   service:"gmail",
      
      
       
  //   auth: {
  //     user: process.env.EMAIL,
  //     pass: process.env.PASSWORD
  //   },
      
  // })

  // var smtpTransport = require('nodemailer-smtp-transport');

  // var transporter = nodemailer.createTransport(smtpTransport({
  //   host: '127.0.0.1',
  //   port: 1025,
  //   secure:false,
  //   auth: {
  //       user: process.env.EMAIL, // my mail
  //       pass: process.env.PASSWORD
  //   },
  //   tls: {
  //           rejectUnauthorized: false
  //       }
  // }));
  
  let transporter =  nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  




  //   let transporter = nodemailer.createTransport({
  //     host: 'smtp.mail.yahoo.com',
  //     port: 465,
  //     secure: true,
  //     auth: {
  //         user: process.env.EMAIL,
  //         pass: process.env.PASSWORD
  //     }
  // });


  // send mail with defined transport object
  let info = await transporter.sendMail(emailBody);

    // EmailBody Object
    // {
    //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //     to: req.body.email, // list of receivers
    //     subject: "Verify Email", // Subject line
    //     text: "reset email", // plain text body
    //     html: `<b>Verify email at <a href=${process.env.VERIFY_URL}/verify?verificationToken=${result.verificationToken}>Click Here to verify Email</a></b>`, // html body
    // }
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return {
        status: info.messageId,
        testURI: nodemailer.getTestMessageUrl(info)
    }

}
module.exports = sendMail