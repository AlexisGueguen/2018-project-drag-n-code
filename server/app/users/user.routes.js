const userController = require('./users.controller');

module.exports = (router) => {
    /**
     * Login
     */
    router
        .route('/login')
        .post(userController.login);

    /**
     * register
     */
    router
        .route('/register')
        .post(userController.register);

    /**
     * get one user details
     */
    router
        .route('/user/:id')
        .get(userController.getById);

    /**
     * get the current user
     */
    router
        .route('/user')
        .get(userController.getCurrent);

    /**
     * get the first users at score
     */
    router
        .route('/users')
        .get(userController.getByScore);

    /**
     * update one user's details
     */
    router
        .route('/user')
        .put(userController.update);
};