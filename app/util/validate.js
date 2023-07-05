const Joi = require("joi")

const _validator = async (data, schema) => {
    try {
        const result = await schema.validate(data)
        if (result.error) {
            return ({
                isError: true,
                message: result.error.message
            })
        } else {
            return ({
                isError: false,
                message: result.value
            })
        }

    } catch (error) {
        return ({
            isError: true,
            message: error
        })
    }
}


module.exports = _validator