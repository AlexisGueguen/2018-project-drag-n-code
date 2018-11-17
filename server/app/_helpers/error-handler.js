module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    // Sanity check
    if (!err.statusCode) err.statusCode = 500;

    console.log(err);

    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    return res.status(err.statusCode).send({ message: err.message });
}