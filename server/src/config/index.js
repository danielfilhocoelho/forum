const config = require('./config');

module.exports = {
    getAPIAddress: function () {
        return config.API && config.API.address ? config.API.address : '127.0.0.1';
    },
    getAPIPort: function () {
        return config.API && config.API.port ? config.API.port : 3000;
    },
    getJwtSecret: function () {
        return config.API.jwt.secret;
    },
    getJwtExpires: function () {
        return config.API.jwt.expires;
    },
    getEmail: function () {
        return config.API.mail.email;
    },
    getPassword: function () {
        return config.API.mail.password;
    }
};
