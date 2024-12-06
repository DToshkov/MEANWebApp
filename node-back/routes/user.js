import express from "express";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const router = express.Router();

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hashedPassword => {
            const user = new User({
                email: req.body.email,
            //passowrd: req.body.password
            password: hashedPassword
        });
        user.save().then(result => {
            res.status(201).json({
                success: true,
                data: result
            })
        }).catch((error) => {
            if (error === 11000) {
                console.log("user already exists!");
                res.status(500).json({
                    success: false,
                    data: "User already exists!"
                });
            } else {
                console.log('Error saving...', error);
                res.status(500).json({
                    success: false,
                    data: error
                });
            }
        });
    }); // hash method takes 1) input we want to hash/encrypt 2) salt / the salting (the longer the salt the longer it would take to decrypt)

});
router.post('/login', (req, res, next) => {
        User.findOne({email: req.body.email}).then(user => {
            if (!user) {
                return res.status(401).json({
                    success: false,
                    data: 'Could not find user'
                });
            }
            return bcrypt.compare(req.body.password, user.password);
        }).then(result => {
            if(!result) {
                return res.status(401).json({
                    success: false,
                    data: 'password not found'
                });
            }
            const token = jwt.sign({email: req.body.email, userId: req.body.password},
                'secret_this_should_be_longer',
                {expiresIn: '1h'});
            res.status(200).json({
                success: true,
                token: token,
                expiresIn: 3600 //expires in 1 hour (seconds)
            });
        }).catch(err => {
            console.log(err);
        });
    });


export default router;
