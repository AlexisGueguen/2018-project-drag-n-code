const user = require('./users/user.routes');
const levels = require('./levels/level.routes');
const run = require('./run/run.routes');
const achievements = require('./achievements/achievement.routes');

module.exports = (router) => {
    user(router);
    levels(router);
    run(router);
    achievements(router);
};