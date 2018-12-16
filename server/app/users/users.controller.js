const userService = require('./user.service');
const throwForbiddenError = require("../_helpers/utils").throwForbiddenError;
const achievementConstants = require("../achievements/achievement.constants");
const {validateEmail} = require('../_helpers/utils');

// Interface
module.exports = {
    login,
    register,
    getCurrent,
    getByScore,
    update,
};

async function login(req, res, next) {
    try {
        let user = await userService.login(req.body);
        if (user) {
            /* Achievements checks */
            user = await userService.addAchievement(user, achievementConstants.Login);
            user = await userService.loginObjectSplitter(user);
            res.json(user)
        }
        else {
            res.status(400).json({message: 'Username or password is incorrect'})
        }
    }
    catch(err) {
        next(err)
    }
}

function register(req, res, next) {
    let user = req.body;
    if (!validateEmail(user.email)) throw 'Email ' + user.email + ' is invalid';

    userService.create(req.body)
        .then(() => res.status(201).json({}))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    const id = req.user.sub;
    userService.getById(id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByScore(req, res, next) {
    userService.getByScore(req.query.topNumber)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
}

async function update(req, res, next) {
    try {
        let updatedUser = await userService.update(req.body, req.user.sub);

        /* Achievements checks */
        if(await userService.hasUploadedPicture(updatedUser)) {
            updatedUser = await userService.addAchievement(updatedUser, achievementConstants.UploadedPicture);
        }
        res.status(200).json(updatedUser)
    }
    catch(err) {
        next(err)
    }
}