const runController = require('./run.controller');

module.exports = (router) => {

    /**
     * Compile and run the code
     */
    router
        .route('/run')
        .post(runController.compileAndRun);
};