const levelController = require('./level.controller');

module.exports = (router) => {

    /**
     * Get all the levels
     */

    /**
     * @api {get} /levels Request a List of all the Levels
     * @apiName GetUser
     * @apiGroup Level
     *
     * @apiParam {Boolean} get Levels created by the community ?
     *
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     * */
    router
        .route('/levels')
        .get(levelController.getAll);

    /**
     * Get one level
     */
    router
        .route('/levels/:id')
        .get(levelController.getById);

    /**
     * Get levels created by a player
     */
    router
        .route('/player-levels/:id')
        .get(levelController.getByAuthorId);

    /**
     * Create a level
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
     * Delete a level
     */
    router
        .route('/levels/:id')
        .delete(levelController.delete);
};