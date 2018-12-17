const db = require('app/_helpers/db');
const throwForbiddenError = require("../_helpers/utils").throwForbiddenError;
const Level = db.Level;
const _ = require('lodash');

module.exports = {
    getAll,
    getById,
    getByAuthorId,
    create,
    update,
    delete: _delete,
    toggleLike,
    isLevelDifficultyMedium,
    isLevelDifficultyHard,
    hasUserPlayedAllHomeLevels,
    has100Likes,
    isFirstLevelCreated,
    isFifthLevelCreated
};

async function getById(id) {
    let level = await Level.findById(id);
    if (level == null) throw {
        name: 'Error',
        message: `Level ${id} not found`,
        statusCode: 404
    };
    return level;
}

async function getByAuthorId(id) {
    return await Level.find({author: id}, 'title description statement difficulty upVotes');
}

async function getAll(isCommunity) {
    return await Level.find({isCreatedByCommunity: isCommunity}, 'title description statement author difficulty upVotes isCreatedByCommunity');
}

async function create(levelParam, userId) {
    if (!userId || userId !== levelParam.author) throwForbiddenError();
    if (await Level.findOne({title: levelParam.title})) {
        throw {
            name: 'Error',
            message: `Level ${levelParam.title} already taken`,
            statusCode: 403
        };
    }
    const level = new Level(levelParam);
    return await level.save();
}

async function update(levelParam) {
    if (levelParam._id === null || levelParam._id === undefined) throw {
        name: 'Error',
        message: `Object in body is incorrect, provide an _id field.`,
        statusCode: 400
    };
    if (!await Level.findById(levelParam._id)) {
        throw {
            name: 'Error',
            message: `Level ${levelParam.title} not found`,
            statusCode: 404
        };
    }

    let level = new Level(levelParam);

    return await Level.findByIdAndUpdate(levelParam._id, level, {new: true});
}

async function _delete(levelId, userId) {
    const level = await Level.findById(levelId);
    if (!level) {
        throw {
            name: 'Error',
            message: `Level ${levelId} not found`,
            statusCode: 404
        };
    }
    if (!userId || userId !== level.author) throwForbiddenError();
    await Level.findByIdAndRemove(levelId);
}

async function toggleLike(levelId, user) {
    let level = await Level.findById(levelId);
    if (!level) throw {
        name: 'Error',
        message: `Level with the id ${levelId} not found`,
        statusCode: 404
    };

    if (user.likes.includes(levelId)) {
        level.upVotes --;
    }
    else {
        level.upVotes ++;
    }
    return await Level.findByIdAndUpdate(levelId, level, {new: true});
}

async function isLevelDifficultyMedium(level) {
    return level.difficulty === 2;
}

async function isLevelDifficultyHard(level) {
    return level.difficulty === 3;
}

async function hasUserPlayedAllHomeLevels(user) {
    let homeLevels = await this.getAll(false);
    return _.difference(homeLevels, user.levelsCompleted).length === 0
}

async function has100Likes(level) {
    return level.upVotes === 100;
}

async function isFirstLevelCreated(user) {
    let createdLevels = await this.getByAuthorId(user._id);
    return await createdLevels.length === 1;
}

async function isFifthLevelCreated(user) {
    let createdLevels = await this.getByAuthorId(user._id);
    return await createdLevels.length === 5;
}