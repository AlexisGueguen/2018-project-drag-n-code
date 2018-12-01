const runService = require('./run.service');

module.exports = {
    compileAndRun
};

function compileAndRun(req, res, next) {
    runService.runAndCompile(req.body)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
}