const user = require('./users/user.routes');
const levels = require('./levels/level.routes');

module.exports = (router) => {
    user(router);
    levels(router);
};