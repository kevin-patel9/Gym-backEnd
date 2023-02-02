const mongoose = require('mongoose');
const Joi = require('joi');

const afterScanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    date: {
        type: String
    }
})

const Scanned = mongoose.model("Scanned", afterScanSchema );

function validateScan (scan){
    const schema = Joi.object({
        name: Joi.string().min(3).max(80),
        username: Joi.string().min(4).max(80),
        date: Joi.date()
    })

    return schema.validate(scan);
}

module.exports.Scanned = Scanned;
module.exports.validateScan = validateScan;