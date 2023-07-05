const service = require("./user.service")
const userValidation = require("./user.schema")
const validator = require("../../util/validate")


exports.register = async (req, res) => {
    try {

        let result = await validator(req.body, userValidation.register)

        if (result.isError) {
            return res.status(403).send(result.message)

        } else {

            let response = await service.register(result.message)

            return res.status(200).send(response)


        }

    } catch (error) {

        return res.status(500).send(error.message || "Internal server Error")

    }
}

exports.login = async (req, res) => {
    try {

        let result = await validator(req.body, userValidation.login)

        if (result.isError) {
            return res.status(403).send(result.message)

        } else {

            let response = await service.login(result.message)

            return res.status(200).send(response)

        }
    } catch (error) {
        return res.status(500).send(error.message || "Internal server error")
    }
}

exports.getUser = async (req, res) => {
    try {
        const id = req.user._id
        const response = await service.getUser(id)

        return res.status(200).send(response)

    } catch (error) {
        return res.status(500).send(error.message || "internal server error")
    }
}