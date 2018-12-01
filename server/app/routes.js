const user = require('./users/user.routes');
const levels = require('./levels/level.routes');
const run = require('./run/run.routes');

module.exports = (router) => {
    user(router);
    levels(router);
    run(router);
};