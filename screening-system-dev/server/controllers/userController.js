const User = require("../models/User");
//const mailgun = require("mailgun-js");
//const DOMAIN = '';
const crypto = require("crypto");
//const key = "";
//const mg = mailgun({ apiKey: key, domain: DOMAIN });
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function signUp(req, res) {
    let body = req.body;
    var user = new User();
    let passwordEncrypt = crypto
        .createHash("md5")
        .update(body.password)
        .digest("hex");

    user.Password = passwordEncrypt;

    user.FirstName = body.firstName;
    user.LastName = body.lastName;
    user.EmailId = body.email;


    console.log("signup controller");
    try {
        let sameEmail = await User.findOne({ EmailId: body.email }).count();
        if (sameEmail > 0) {
            res.sendStatus(201);
            console.log("Email already existed");
        }
        // Email already existed
        else {
            console.log("New Account Created");
            await user.save();
            res.sendStatus(200);
        }
    } catch (err) {
        console.log(err);
    }
}
const token = crypto.randomBytes(20).toString("hex");
/*const data = {
    from: 'Gym Time <me@samples.mailgun.org>',
    to: 'lakshay.venom@gmail.com, YOU@YOUR_DOMAIN_NAME',
    subject: 'Hello',
    text: "Thank you for subscribing to gym time! \n\n" +
        "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it: \n\n" +
        `http://localhost:8080/reset/${token} \n\n` +
        "if you did not request this, please ignore this email and your password will remain unchanged."
};
*/
const msg = {
    to: 'lakshay.venom@gmail.com',
    from: 'subscription@gymtime.com',
    subject: 'Account activation Email',
    text: "Thank you for subscribing to gym time! \n\n" +
        "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it: \n\n" +
        `http://localhost:8080/reset/${token} \n\n`,
    html: "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it: \n\n" +
        `http://localhost:8080/reset/${token} \n\n` + '<strong>if you did not request this, please ignore this email and your password will remain unchanged</strong>',
};

async function sendEmail(req, res) {
    console.log("In sending email controller");
    /*  try {

          let email = req.body.email;
          let user = await User.findOne({ EmailId: email });
          if (!user) {
              console.log("The email is repeated");
              mg.messages().send(data, function(error, body) {
                  console.log(body);
              });
              res.sendStatus(201);
          } else {

              await User.update({
                  EmailId: email
              }, {
                  activationToken: token,
                  activationTokenExpires: Date.now() + 600000
              });



              mg.messages().send(data, function(err, body) {
                  console.log(body);
              });

              console.log("Sending email");
          }
      } catch (err) {
          console.log(err);
          console.log("trying with sendgrid"); */
    try {
        let email = req.body.email;
        let user = await User.findOne({ EmailId: email });
        if (!user) {
            console.log("The email is repeated");

            sgMail.send(msg);
            res.sendStatus(201);
        } else {

            await User.update({
                EmailId: email
            }, {
                activationToken: token,
                activationTokenExpires: Date.now() + 600000
            });
            sgMail.send(msg);
            console.log("Sending email");
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    signUp,
    sendEmail
};