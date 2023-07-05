const Joi = require("joi");

const _login = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()

})

const _register = Joi.object().keys({

    username: Joi.string().required(),
    password: Joi.string().required(),
    mobileNumber: Joi.string().required(),
    email: Joi.string().email().required(),
})

module.exports = {
    login: _login,
    register: _register
}