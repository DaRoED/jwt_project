require('dotenv').config();

const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    const token = req.cookies['access_token'];

    if (!token) return next();

    try {
        const decoded = jwt.verify(token, process.env['JWT_secret']);

        req.user = {
            id: decoded.id,
        }

        console.log(decoded);
        return next();

    } catch (e) {
        return next();
    }
}

module.exports = jwtMiddleware;