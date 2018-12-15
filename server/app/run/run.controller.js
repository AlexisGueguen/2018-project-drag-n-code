const runService = require('./run.service');
const levelService = require('../levels/level.service');
const userService = require('../users/user.service');

module.exports = {
    compileAndRun
};

async function compileAndRun(req, res, next) {
    try {
        const level = await levelService.getById(req.body.level);
        const data = await runService.runAndCompile(req.body.language, req.body.code, level);
        if (data.validated) {
            await userService.setLevelCompleted(req.user.sub, level._id, level.difficulty);
        }
        res.status(200).json(data);
    } catch (err) {
        next(err)
    }
}