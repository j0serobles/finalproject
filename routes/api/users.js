const express = require('express');
const router = express.Router();
const axios = require('axios'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');

//Matches api/users/register
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) return res.status(400).json(errors);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if(user) return res.status(400).json({ email: "Email already exists" });

        const newUser = new User({
            name,
            email,
            password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;

                newUser.password = hash;
                newUser.save()
                  .then( savedUser => {
                    
                    let newMessage = {
                        addresses:  [savedUser.email],
                        subject   : "Welcome to MERNBaby.com!",
                        message   :  `A new user, named ${savedUser.name}, has been registered at MERNBaby.com.`
                    }

                    const port = process.env.PORT || 5000;
                    const api_url = "http://localhost:" + port + "/api/mailer/sendmail" ;
                    axios.post(api_url, newMessage)
                      .then( response => res.json( savedUser) )
                      .catch( err     => res.status(400).json(err));
                  })
                  .catch( err => {
                      res.status(400).send("users.js[41]:Error saving:" + err);
                  });
            });
        });
    });
});

//Matches api/users/login
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) return res.status(400).json(errors);

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if(!user) return res.status(404).json({ emailnotfound: "Email not found" });

        bcrypt.compare(password, user.password).then(isMatch => {
            if(!isMatch) return res.status(400).json({ passwordincorrect: "Password incorrect" });

            const payload = {
                id: user.id,
                name: user.name
            };

            jwt.sign(payload, keys.cypher, { expiresIn: 31556926 }, (err, token) => {
                if(err) return res.status(400).json({ tokenerror: "There was a problem updating your security token" });
                
                res.json({
                    success: true,
                    token: "Bearer " + token
                });
            });
        });
    });
});

module.exports = router;