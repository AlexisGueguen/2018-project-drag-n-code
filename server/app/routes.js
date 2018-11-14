const user = require('./users/user.routes');

module.exports = (router) => {
    user(router);
};