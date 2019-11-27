const router     = require("express").Router();
let   nodemailer = require('nodemailer'); 


// Matches with "/api/mailer/sendmail"


router.post("/sendmail", (req, res) => {

    const recipients = req.body.addresses;
    const subject    = req.body.subject;
    const message    = req.body.message;

    let transporter = nodemailer.createTransport ({
        service: 'gmail', 
        auth : { 
            user : 'engjoserobles@gmail.com', 
            pass: 'tspetoarmkaypwdh'
        }
    });

    const mailOptions = { 
        from    : 'jose@engjoserobles.com', 
        to      : recipients.join(),
        subject : subject, 
        html    : message
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) { return res.status(400).json(err); } 
        else { return res.json(info); } 
      }
    );

});

module.exports = router;
