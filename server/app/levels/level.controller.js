const levelService = require('./level.service');
const userService = require('../users/user.service');

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

function create(req, res, next) {
    const userId = req.user.sub;
    const level = req.body;
    levelService.create(level, userId)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
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
        console.log('req', req);
        const userId = req.user.sub;
        const user = await userService.getById(req.user.sub, userId);
        const levelUpdated = await levelService.toggleLike(req.params.id, user);
        const userUpdated = await userService.toggleLike(req.params.id, user);
        res.status(200).json({level: levelUpdated, user: userUpdated});
    } catch(err) {
        next(err);
    }
}