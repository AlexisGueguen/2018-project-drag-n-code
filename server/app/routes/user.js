var userController = require('./../controllers/user.ctrl')
var passport = require('passport')

module.exports = (router) => {
    /**
     * register
     */
    router
        .route('/user')
        .post(userController.addUser)
        
    /**
     * get one user details
     */
    router
        .route('/user/:id')
        .get(userController.getUser)

    /**
     * get the current user
     */
    router
        .route('/user')
        .get(userController.getCurrentUser)
}