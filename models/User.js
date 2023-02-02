const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    },
    qrCode: {
        type: String
    },
    userCode: {
        type: String
    },
    isOwner: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model("User", userSchema );

function validate (user){
    const schema = Joi.object({
        name: Joi.string().min(3).max(80).required(),
        email: Joi.string().min(3).max(80).required(),
        username: Joi.string().min(4).max(80).required(),
        password: Joi.string().min(4).max(1024).required(),
        qrCode: Joi.string(),
        userCode: Joi.string(),
        isOwner: Joi.boolean(),
    })

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validate;

