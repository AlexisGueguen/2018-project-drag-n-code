const achievementController = require('./achievement.controller');

module.exports = (router) => {
    router
        .route('/achievement')
        .post(achievementController.create);


    router
        .route('/achievement/:id')
        .get(achievementController.getById);


    router
        .route('/achievement')
        .get(achievementController.getAll);


    router
        .route('/achievement')
        .put(achievementController.update);

    router
        .route('/achievement/:id')
        .delete(achievementController._delete);
};