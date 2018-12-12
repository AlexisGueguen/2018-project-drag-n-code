const levelController = require('./level.controller');

module.exports = (router) => {

    /**
     * @api {get} /levels Levels List
     * @apiName Get Levels
     * @apiDescription Get the levels created by the community
     * or the base levels of the website
     *
     * @apiGroup Levels
     * @apiHeader {String} Authorization User access token
     * @apiHeader {String} Content-Type application/json
     *
     * @apiParam {Boolean} get Levels created by the community ?
     *
     * @apiSuccess {Level[]} levels List of Playable Levels
     * @apiErrorExample {json} Error
     * {
     *     "message": "..."
     * }
     * @apiVersion 1.0.0
     * */
    router
        .route('/levels')
        .get(levelController.getAll);

    /**
     * @api {get} /levels/:id Get a Level
     * @apiName Get Level Data
     * @apiDescription Get the data of one level based on it's id
     *
     * @apiGroup Levels
     * @apiHeader {String} Authorization User access token
     * @apiHeader {String} Content-Type application/json
     *
     * @apiParam {String} Level id
     *
     * @apiSuccess (Success) {Level} user the updated user
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
     * */
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
     * */
    router
        .route('/player-levels/:id')
        .get(levelController.getByAuthorId);

    /**
     * @api {post} /levels Create a level
     * @apiName Create a Level
     * @apiDescription Create a Community Level
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
     * */
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
     * @api {delete} /levels Delete a level
     * @apiName Delete a Level
     * @apiDescription Delete one of my Levels
     *
     * @apiGroup Levels
     * @apiHeader {String} Authorization User access token
     * @apiHeader {String} Content-Type application/json
     *
     * @apiParam (Body) {String} id of the level to delete
     *
     * @apiErrorExample {json} Error
     * {
     *     "message": "..."
     * }
     * @apiVersion 1.0.0
     * */
    router
        .route('/levels/:id')
        .delete(levelController.delete);
};