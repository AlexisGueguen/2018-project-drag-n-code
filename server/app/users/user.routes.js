const userController = require('./users.controller');

module.exports = (router) => {
    /**
     * @api {post} /login Login
     * @apiName Login
     * @apiDescription Log a user by checking name and password
     * @apiGroup Users
     * @apiHeader {String} Content-Type application/json
     * @apiParam (Body) {String} username the user username
     * @apiParam (Body) {String} password the user password
     * @apiParamExample {json} Body
     * {
     *     "username": "John",
     *     "password": "pwd"
     * }
     * @apiSuccess (Success) {Object} user the logged user, with its connection token
     * @apiSuccessExample {json} Success
     * {
     *      "_id": "5bf548bauyreb7f41fffc84ec",
     *      "username": "John",
     *      "email": "john@mail.com",
     *      "picture": "",
     *      "token": "eyJhb[...]xldcAVdDPLjffkug"
     * }
     * @apiErrorExample {json} error
     * {
     *     "message": "..."
     * }
     * @apiVersion 1.0.0
     */
    router
        .route('/login')
        .post(userController.login);

    /**
     * @api {post} /register Register
     * @apiName Register
     * @apiDescription Register a new user
     * @apiGroup Users
     * @apiHeader {String} Content-Type application/json
     * @apiParam (Body) {Object} user the user to register
     * @apiParamExample {json} Body
     * {
	 *      "username":"John",
	 *      "password":"pwd",
	 *      "email": "john@mail.com",
     * }
     * @apiSuccessExample {json} Success
     * {}
     * @apiErrorExample {json} error
     * {
     *     "message": "..."
     * }
     * @apiVersion 1.0.0
     */
    router
        .route('/register')
        .post(userController.register);

    /**
     * @api {get} /user/:id Get a user by id
     * @apiName Get user by id
     * @apiDescription Get a user based on its id
     * @apiGroup Users
     * @apiHeader {String} Authorization User access token
     * @apiHeader {String} Authorization User access token
     * @apiSuccess (Success) {Object} user the user corresponding to the id
     * @apiSuccessExample {json} Success
     * {
     *      "_id": "5bf548bauyreb7f41fffc84ec",
     *      "username": "John",
     *      "email": "john@mail.com",
     *      "picture": "",
     *      "score": 0
     * }
     * @apiErrorExample {json} error
     * {
     *     "message": "..."
     * }
     * @apiVersion 1.0.0
     */
    router
        .route('/user/:id')
        .get(userController.getById);

    /**
     * @api {get} /user Get the best users by score descending
     * @apiName Get best users
     * @apiDescription Get the best users by score descending.
     * @apiGroup Users
     * @apiHeader {String} Authorization User access token
     * @apiHeader {String} Content-Type application/json
     * @apiParam (Query) {Number} topNumber the number of user to return
     * @apiSuccess (Success) {Object[]} users the list of the best user, with its connection token
     * @apiSuccessExample {json} Success
     * [
     *      {
     *          "_id": "5bf548bauyreb7f41fffc84ec",
     *          "username": "John",
     *          "email": "john@mail.com",
     *          "picture": "",
     *          "score": 0
     *      },
     *      {
     *          ...
     *      }
     * ]
     * @apiErrorExample {json} error
     * {
     *     "message": "..."
     * }
     * @apiVersion 1.0.0
     */
    router
        .route('/user')
        .get(userController.getByScore);

    /**
     * @api {put} /user Update a user
     * @apiName Update user
     * @apiDescription Update a user based on its _id.
     * @apiGroup Users
     * @apiHeader {String} Authorization User access token
     * @apiHeader {String} Content-Type application/json
     * @apiParam (Body) {Object} user the user update
     * @apiParamExample {json} Body
     * {
     *     "_id": "5bf53e978cb55541ef67e708",
     *     "username": "John",
     *     "email": "john@mail.com",
     *     "picture": "..."
     * }
     * @apiSuccess (Success) {Object} user the updated user
     * @apiSuccessExample {json} Success
     * {
     *     "_id": "5bf548b153eb7f41fffc84ec",
     *     "username": "John",
     *     "email": "john@mail.com",
     *     "picture": "",
     *     "score": 0
     * }
     * @apiErrorExample {json} error
     * {
     *     "message": "..."
     * }
     * @apiVersion 1.0.0
     */
    router
        .route('/user')
        .put(userController.update);
};