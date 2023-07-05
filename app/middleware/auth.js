const jwt = require("jsonwebtoken")

exports.isAuthentication = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]


        if (!token) {
            return res.status(403).send("Token missing")
        } else {

            const decode = jwt.verify(token, process.env.JWT_SECRET)
            if (!decode) {
                return res.status(401).send("Unauthorized")

            } else {

                req.user = decode
                next()

            }
        }
    } catch (error) {

        return res.status(500).send(error.message || "Internal server error")
    }
}