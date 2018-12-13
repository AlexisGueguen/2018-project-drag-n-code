const levelService = require('./level.service');

module.exports = {
    getAll,
    getById,
    getByAuthorId,
    create,
    update,
    delete: _delete
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
    levelService.create(req.body, req.headers.authorization.split(' ')[1])
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
}

function update(req, res, next) {
    levelService.update(req.body)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    levelService.delete(req.params.id, req.headers.authorization.split(' ')[1])
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
}