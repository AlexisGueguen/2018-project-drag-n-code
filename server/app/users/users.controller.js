﻿const userService = require('./user.service');
const { validateEmail } = require('../_helpers/utils');

// Interface
module.exports = {
    login,
    register,
    getCurrent,
    getById,
    getByScore,
    update
};

function login(req, res, next) {
    userService.login(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    //Sanity check
    let user = req.body;
    if (!validateEmail(user.email)) throw 'Email ' + user.email + ' is invalid';

    userService.create(req.body)
        .then(() => res.status(201).json({}))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub, req.headers.authorization.split(' ')[1])
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id, req.headers.authorization.split(' ')[1])
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByScore(req, res, next) {
    userService.getByScore(req.query.topNumber)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.body, req.headers.authorization.split(' ')[1])
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
}