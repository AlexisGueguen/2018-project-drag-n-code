const achievementService = require('./achievement.service');

// Interface
module.exports = {
    getAll,
    getById,
    update,
    _delete,
    create
};


function getAll(req, res, next) {
    achievementService.getAll()
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
}

function getById(req, res, next) {
    achievementService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    achievementService.update(req.body)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
}

function create(req, res, next) {
    achievementService.create(req.body)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    achievementService._delete(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
}