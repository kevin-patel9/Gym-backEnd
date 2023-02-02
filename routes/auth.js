const bcrypt = require('bcrypt')
const _ = require('lodash')
const Joi = require('joi')
const { User, validate } = require('../models/User')
const express = require('express');
const asyncMiddleware = require('../middleWare/asyncMiddleware');
const router = express.Router();

router.post('/register', asyncMiddleware (async (req,res)=> {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  let user =  await User.findOne({ email: req.body.email});
  if (user) return res.status(400).send("Email already registered.")

  let uniqueUserName =  await User.findOne({ username: req.body.username });
  if (uniqueUserName) return res.status(400).send("User name already in-use.")
  
      user = new User (_.pick(req.body, ['name' ,'email' , 'username', 'password', 'qrCode', 'userCode', 'isOwner']));

 const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

    await user.save();

  res.json("New User Created");
}));

router.post('/login' ,asyncMiddleware(async (req, res) => {
    const { error } = validates(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

   let user =  await User.findOne({ email: req.body.email })
   if (!user) return res.status(400).send("Invalid email or password.")

   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if(!validPassword) res.status(400).send("Invalid email or password.")

    res.json(_.pick(user, ['username', 'email', '_id', 'isOwner']));
}));

function validates(auth) {
    const schema = Joi.object({
      email: Joi.string().min(3).max(80).required(),
      password: Joi.string().min(3).max(1024).required()
    });
  
    return schema.validate(auth)
  }
  

module.exports = router;