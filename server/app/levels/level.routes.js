const levelController = require('./level.controller');

module.exports = (router) => {

    /**
     * @api {get} /levels Get all levels
     * @apiName Get all levels
     * @apiDescription Get the levels created by the community
     * or the base levels of the website
     *
     * @apiGroup Levels
     * @apiHeader {String} Authorization User access token
     * @apiHeader {String} Content-Type application/json
     *
     * @apiParam {Boolean} isCommunity true: levels from the community, false: default levels
     *
     * @apiSuccess {Level[]} levels List of levels
     * @apiSuccessExample {json} Success
     * [
     *      {
     *          "_id": "5bf548b153eb7f41ffcc23ec",
     *          "title": "Find Maximum",
     *          "description": "Find the maximum among a list of numbers",
     *          "statement": "Given a list of x numbers, you have to return the highest number of the list",
     *          "inputs": "-99, -1, 0, 14",
     *          "outputs": "14",
     *          "solution": "{insert code here}",
     *          "author": "Victor",
     *          "difficulty": 1,
     *          "isCreatedByCommunity": true,
     *          "upVotes": 666
     *      },
     *      {
     *          ...
     *      }
     * ]
     * @apiErrorExample {json} Error
     * {
     *     "message": "..."
     * }
     * @apiVersion 1.0.0
     */
    router
        .route('/levels')
        .get(levelController.getAll);

    /**
     * @api {get} /levels/:id Get a Level
     * @apiName Get a level
     * @apiDescription Get the data of one level based on it's id
     *
     * @apiGroup Levels
     * @apiHeader {String} Authorization User access token
     * @apiHeader {String} Content-Type application/json
     *
     * @apiParam {String} id Level id
     *
     * @apiSuccess (Success) {Level} level the level corresponding to the id
     * @apiSuccessExample {json} Success
     * {
     *     "_id": "5bf548b153eb7f41ffcc23ec",
     *     "title": "Find Maximum",
     *     "description": "Find the maximum among a list of numbers",
     *     "statement": "Given a list of x numbers, you have to return the highest number of the list",
     *     "inputs": "-99, -1, 0, 14",
     *     "outputs": "14",
     *     "solution": "{insert code here}",
     *     "author": "Victor",
     *     "difficulty": 1,
     *     "isCreatedByCommunity": true,
     *     "upVotes": 666
     * }
     *
     * @apiErrorExample {json} Error
     * {
     *     "message": "..."
     * }
     * @apiVersion 1.0.0
     */
    router
        .route('/levels/:id')
        .get(levelController.getById);

    /**
     * @api {get} /levels Levels List By Author
     * @apiName Get Levels of a User
     * @apiDescription Get the levels created by one User
     *
     * @apiGroup Levels
     * @apiHeader {String} Authorization User access token
     * @apiHeader {String} Content-Type application/json
     *
     * @apiParam {String} Author id
     *
     * @apiSuccess {Level[]} levels List of Levels created by the user
     * @apiErrorExample {json} Error
     * {
     *     "message": "..."
     * }
     * @apiVersion 1.0.0
     */
    router
        .route('/player-levels/:id')
        .get(levelController.getByAuthorId);

    /**
     * @api {post} /levels Create a level
     * @apiName Create a Level
     * @apiDescription Create a level
     *
     * @apiGroup Levels
     * @apiHeader {String} Authorization User access token
     * @apiHeader {String} Content-Type application/json
     *
     * @apiParam (Body) {Level} level The level to create
     * @apiParamExample {json} Body
     * {
     *     "title": "Find Maximum",
     *     "description": "Find the maximum among a list of numbers",
     *     "statement": "Given a list of x numbers, you have to return the highest number of the list",
     *     "inputs": "-99, -1, 0, 14",
     *     "outputs": "14",
     *     "solution": "{insert code here}",
     *     "author": "Victor",
     *     "difficulty": 1,
     * }
     *
     * @apiSuccess {Level} Created Level
     * @apiErrorExample {json} Error
     * {
     *     "message": "..."
     * }
     * @apiVersion 1.0.0
     */
    router
        .route('/levels')
        .post(levelController.create);

    /**
     * Update a level
     */
    router
        .route('/levels')
        .put(levelController.update);

    /**
     * @api {delete} /levels/:id Delete a level
     * @apiName Delete a Level
     * @apiDescription Delete the level selected by the id
     *
     * @apiGroup Levels
     * @apiHeader {String} Authorization User access token
     * @apiHeader {String} Content-Type application/json
     *
     * @apiParam {String} id id of the level to delete
     *
     * @apiErrorExample {json} Error
     * {
     *     "message": "..."
     * }
     * @apiVersion 1.0.0
     */
    router
        .route('/levels/:id')
        .delete(levelController.delete);
};