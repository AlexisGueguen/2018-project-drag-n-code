const runController = require('./run.controller');

module.exports = (router) => {

    /**
     * @api {post} /run Compile and Run
     * @apiName Compile and Run
     * @apiDescription Compile the provided code and run it.
     * @apiGroup Run
     * @apiHeader {String} Authorization User access token
     * @apiHeader {String} Content-Type application/json
     * @apiParam (Body) {String} language the code language
     * @apiParam (Body) {String} code the code to compile and run
     * @apiParamExample {json} Body
     * {
     *     "language": "c++",
     *     "code": "public class HelloWorld { \npublic static void main(String[] args) { \nSystem.out.print(\"Hello, World\");\n }\n}"
     * }
     * @apiSuccess (Success) {Object} Object the compilation and run outputs
     * @apiSuccessExample {json} Success
     * {
     *      "message": {
     *          "stderr": "",
     *          "stdout": "Hello, World",
     *          "exitCode": 0
     *      }
     * }
     * @apiErrorExample {json} error
     * {
     *     "message": "..."
     * }
     * @apiVersion 1.0.0
     */
    router
        .route('/run')
        .post(runController.compileAndRun);
};