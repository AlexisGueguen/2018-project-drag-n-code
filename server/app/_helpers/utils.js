module.exports = {
    validateEmail,
    throwForbiddenError,
    isStrongPassword
};

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function throwForbiddenError() {
    throw {
        name: 'Forbidden',
        message: `Forbidden Access`,
        statusCode: 403
    };
}

function isStrongPassword(password) {
    let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return re.test(String(password));
}