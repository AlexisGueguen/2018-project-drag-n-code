const achievementConstants = require("../achievements/achievement.constants");

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
            const user = await userService.getById(req.user.sub);

            /* Achievements Checks */
            await userService.addAchievement(user, achievementConstants.LevelFinished);
            if(await levelService.isLevelDifficultyMedium(level)) {
                await userService.addAchievement(user, achievementConstants.DifficultyMedium)
            }
            if(await levelService.isLevelDifficultyHard(level)) {
                await userService.addAchievement(user, achievementConstants.DifficultyHard)
            }
            if(await userService.isUserRank1(user)) {
                await userService.addAchievement(user, achievementConstants.Rank1)
            }
            if(await userService.isUserScoreOver100(user)) {
                await userService.addAchievement(user, achievementConstants.Score100)
            }
            if(await userService.isUserScoreOver500(user)) {
                await userService.addAchievement(user, achievementConstants.Score500)
            }
            if(await levelService.hasUserPlayedAllHomeLevels(user)) {
                await userService.addAchievement(user, achievementConstants.HomeLevels)
            }
        }
        res.status(200).json(data);
    } catch (err) {
        next(err)
    }
}