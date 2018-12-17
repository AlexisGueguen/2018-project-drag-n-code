const levelService = require('./level.service');
const userService = require('../users/user.service');
const achievementConstants = require("../achievements/achievement.constants");

module.exports = {
    getAll,
    getById,
    getByAuthorId,
    create,
    update,
    delete: _delete,
    like
};

function getAll(req, res, next) {
    levelService.getAll(req.query.isCommunity)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
}

function getById(req, res, next) {
    levelService.getById(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
}

function getByAuthorId(req, res, next) {
    levelService.getByAuthorId(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
}

async function create(req, res, next) {
    try {
        const userId = req.user.sub;
        const level = req.body;
        const createdLevel = await levelService.create(level, userId);

        /* Achievements checks */
        let user = await userService.getById(userId);
        if(await levelService.isFirstLevelCreated(user)){
            await userService.addAchievement(user, achievementConstants.LevelCreated);
        }
        if(await levelService.isFifthLevelCreated(user)) {
            await userService.addAchievement(user, achievementConstants.FiveLevelCreated);
        }

        res.status(201).json(createdLevel)
    }
    catch(err) {
        next(err);
    }
}

function update(req, res, next) {
    levelService.update(req.body)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
}

async function _delete(req, res, next) {
    try {
        const data = await levelService.delete(req.params.id, req.user.sub);
        await userService.removeLevelFromUsers(req.params.id);
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
}

async function like(req, res, next) {
    try {
        const userId = req.user.sub;
        const user = await userService.getById(req.user.sub, userId);
        const levelUpdated = await levelService.toggleLike(req.params.id, user);
        let userUpdated = await userService.toggleLike(req.params.id, user);

        /* Achievements checks */
        if(await userService.hasOneLike(userUpdated)) {
            await userService.addAchievement(userUpdated, achievementConstants.LevelLiked);
        }

        if(await levelService.has100Likes(levelUpdated)) {
            let author = await userService.getById(levelUpdated.author);
            await userService.addAchievement(author, achievementConstants.Level100Likes);
        }

        res.status(200).json({level: levelUpdated});
    } catch(err) {
        next(err);
    }
}