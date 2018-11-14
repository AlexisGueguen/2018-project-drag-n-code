var authController = require('./../controllers/authentication.ctrl')
var passport = require('passport')

module.exports = (router) => {
    /**
     * login
     */
    router
        .route('/login')
        .post(
            passport.authenticate('local'), 
            authController.login
        )

    /**
     * logout
     */
    router
        .route('/logout')
        .get(authController.logout)
}