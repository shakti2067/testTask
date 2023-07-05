const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const schemaOptions = {
    createdAt: "createdDate",
    updatedAt: "updatedDate"

}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    mobileNumber: {
        type: String,
        default: ""
    },
    hashPassword: {
        type: String,
        default: ""
    },
    salt: {
        type: String,
        default: ""
    },
    token: {
        type: String,
        default: ""
    },
    isMobileVerified: {
        type: Boolean,
        default: false
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isBlock: {
        type: Boolean,
        default: false
    }
},
    schemaOptions)

userSchema.pre("save", function (next) {
    this.updatedDate = Date.now()
    next()
})


userSchema.methods = {

    signToken: async function (planText) {
        this.token = jwt.sign(
            planText, process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            })
        return this.token
    },

    encryptPassword: async function (planText) {
        const saltRouds = 10;
        this.salt = await bcrypt.genSalt(saltRouds)

        this.hashPassword = await bcrypt.hash(planText, this.salt)
        return this.hashPassword
    },

    authenticate: async function (planText) {
        return await bcrypt.compare(planText, this.hashPassword)
    }
}

module.exports = mongoose.model('user', userSchema)