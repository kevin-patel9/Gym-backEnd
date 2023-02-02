const { User } = require('../models/User');
const express = require('express');
const router = express.Router();
const _ = require('lodash')

// get all user detail

// router.get('/', async (req, res)=> {

//     const user = await User.find().sort('email');

//     if(!user) return res.status(404).send("Database is Empty");
    
//     res.json(user)
    
// });

router.get('/:id', async (req, res)=> {

    const user = await User.findById(req.params.id).select('-password -updatedAt');

    if(!user) return res.status(404).send("Database is Empty");
    
    res.json(user)
    
});

router.get('/', async (req, res)=> {

    const user = await User.find({userCode: req.query.userCode}).select("name email username -_id");

    if(!user) return res.status(404).send("Database is Empty");
    
    res.json(user)
    
});

router.put('/:id', async (req, res)=> {
    
    const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },
    { new: true }
    )

    if(!user.id) return res.status(404).send("User with given ID not found.")
    
    res.status(200).json(user);
});

// user can delete its account

router.delete('/:id', async (req, res)=> {

     const user = await User.findByIdAndRemove(req.params.id)

    if(!user.id) return res.status(404).send("User with given ID not found.") 
    
    res.status(200).json("User has been deleted.");
});


module.exports = router;