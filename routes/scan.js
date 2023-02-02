const { Scanned } = require('../models/AfterScanData');
const express = require('express');
const asyncMiddleware = require('../middleWare/asyncMiddleware');
const router = express.Router();
const _ = require('lodash')

router.get('/', asyncMiddleware(async(req,res)=> {
    const scan = await Scanned.find();

    if(!scan) return res.status(404).send("Database is Empty");
    
    res.json(scan)
}))

router.post('/', asyncMiddleware(async(req, res) => {
   const scan =  new Scanned (_.pick(req.body, ['name', 'username', 'date']))

   await scan.save();

   res.send(scan)
}));

module.exports = router;