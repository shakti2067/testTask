const User = require("../../models/user.model");



exports.register = async (data) => {
    try {

        const { email, mobileNumber, username, password } = data

        let existingUser = await User.findOne({ $or: [{ email: email }, { mobileNumer: mobileNumber }] })

        if (!existingUser) {
            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                return "Please enter valid email id"
            }

            if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
                return "Please enter valid mobile number"
            }

            if (!password.trim()) {
                return "Space is not allowed in password"
            }

            if (!username.trim()) {
                return "Space is not allowed in username"
            }

            let user = {}
            user.username = username
            user.email = email
            user.mobileNumber = mobileNumber

            let createUser = await User.create(user)

            //encrypt password
            let hashPassword = await createUser.encryptPassword(password)

            //store user into db
            let userData = await createUser.save()

            let obj = {}
            obj.username = userData.username
            obj.email = userData.email
            obj.mobileNumber = userData.mobileNumber

            return obj

        } else {
            return "User already register"
        }
    } catch (error) {
        throw new Error(error)

    }
}

exports.login = async (data) => {
    try {
        const { username, password } = data

        let query = {
            $and: [
                {
                    $or: [
                        { email: username },
                        { mobileNumber: username }
                    ]
                },
                {
                    $and: [
                        { isActive: true },
                        { isDeleted: false }
                    ]
                }
            ]
        }
        const findUser = await User.findOne(query)

        if (!findUser) {

            return "User not register"

        } else {

            const checkPassword = await findUser.authenticate(password)

            if (!checkPassword) {
                return "Invalid Credentials"
            }
            let obj = {}
            obj.username = findUser.username
            obj.email = findUser.email
            obj.mobileNumber = findUser.mobileNumber
            obj._id = findUser._id

            //Generate token
            await findUser.signToken(obj)

            //Save user token
            let saveUser = await findUser.save()

            let userObj = {}
            userObj.username = saveUser.username
            userObj.token = saveUser.token

            return userObj
        }

    } catch (error) {
        throw new Error(error)
    }
}

exports.getUser = async (id) => {
    try {

        const checkUser = await User.findOne({ _id: id })

        if (!checkUser) {

            return "User not found"

        } else {
            let user = {}
            user.username = checkUser.username
            user.email = checkUser.email
            user.mobileNumber = checkUser.mobileNumber
            user.token = checkUser.token
            user.isMobileVerified = checkUser.isMobileVerified
            user.isEmailVerified = checkUser.isEmailVerified
            user.isActive = checkUser.isActive
            user.isDeleted = checkUser.isDeleted
            user.isBlock = checkUser.isBlock

            return user

        }

    } catch (error) {

        throw new Error(error)

    }
}