const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const userSchemna = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

const SECRET_KEY = 'MYNAMEISABHUISHEKKHANNAANDIAMFULLSTACKWEBDEVELOPERANDAMVERYSMART';

userSchemna.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
        this.cpassword = await bcrypt.hash(this.cpassword, 10)
    }

    next();
})

// we are generating token

userSchemna.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}


// collection creation
const User = mongoose.model("UserData", userSchemna)

module.exports = User;