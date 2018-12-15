const config = require('../../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('app/_helpers/db');
const throwForbiddenError = require("../_helpers/utils").throwForbiddenError;
const User = db.User;
const _ = require('lodash');
const isStrongPassword = require("../_helpers/utils").isStrongPassword;

// Interface
module.exports = {
    login,
    getById,
    create,
    update,
    getByScore,
    setLevelCompleted,
    toggleLike,
    removeLevelFromUsers
};

async function login({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        // Split the user object
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getById(id) {
    return await User.findById(id).select('-hash -__v -createdDate');
}

async function create(userParam) {
    // Check if already exist in db
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    if (!isStrongPassword(userParam.password)) throw 'Password is too weak.';
    userParam.score = 0;
    userParam.likes = [];
    userParam.levelsCompleted = [];
    userParam.achievements = [];
    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(userParam, userId) {
    if (!userParam._id) throw {
        name: 'Error',
        message: `Object in body is incorrect, provide an _id field.`,
        statusCode: 400
    };
    const userInDB = await User.findById(userParam._id);
    if (!userInDB) {
        throw {
            name: 'Error',
            message: `User ${userParam.username} not found`,
            statusCode: 404
        };
    }
    if (userParam._id !== userId) throwForbiddenError();
    const duplicateUserInDB = await User.findOne({ username: userParam.username });
    if (duplicateUserInDB && duplicateUserInDB._id === userParam._id) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    let user = new User(userParam);
    const { hash, achievements, score, likes, levelsCompleted, createdDate, ...userSanitized } = user.toObject();
    return await User.findByIdAndUpdate(userParam._id, userSanitized, {new: true}).select('-hash -__v -createdDate');
}

async function getByScore(topNumber) {
    let limitNumber = Number(topNumber);
    if (!limitNumber) throw {
        name: 'Error',
        message: `Object in query is incorrect, provide a valid number.`,
        statusCode: 400
    };

    return await User
        .find({}, 'username picture score')
        .sort({score : -1})
        .limit(limitNumber)
}

async function setLevelCompleted(userId, levelId, levelDifficulty) {
    let user = await getById(userId);
    if (user.levelsCompleted.indexOf(levelId) === -1) {
        user.levelsCompleted.push(levelId);
        if (levelDifficulty > 0 && levelDifficulty <= 3) user.score += 10 * levelDifficulty;
        return await User.findByIdAndUpdate(userId, user, {new: true}).select('-hash -__v -createdDate');
    }
    return user;
}

async function toggleLike(levelId, user) {
    if (user.likes.includes(levelId)) {
        user.likes.splice(user.likes.indexOf(levelId), 1);
    }
    else {
        user.likes.push(levelId);
    }

    return await User.findByIdAndUpdate(user._id, user, {new: true});
}

async function removeLevelFromUsers(levelId) {
    const users = await User.find({}, 'likes levelsCompleted');
    console.log('before: ', users);
    for(let i = 0 ; i < users.length ; i++) {
        _.pull(users[i].likes, levelId);
        _.pull(users[i].levelsCompleted, levelId);
        await User.findByIdAndUpdate(users[i]._id, users[i]);
    }
    console.log('after: ', users);
}