const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = async (request, response, next) => {
    try {
        if (request.cookies.jwt) {
            const token = request.cookies.jwt;

            if (!token) {
                return response.status(401).send('Invalid token');
            } else {
                jwt.verify(token, config.getJwtSecret(), (err, decoded) => {
                    if (err) {
                        return response.status(401).send('Invalid token');
                    } else {
                        request.userid = decoded.id;
                        const token = jwt.sign({ id: decoded.id }, config.getJwtSecret(), {
                            expiresIn: config.getJwtExpires()
                        });
                        response.cookie('jwt', token);
                        return next();
                    }
                });
            }
        } else {
            response.status(401).send('No token provided');
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
};
