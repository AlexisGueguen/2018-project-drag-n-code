module.exports = {
    runAndCompile
};

const languages = ['javascript', 'c', 'c++', 'java'];

async function runAndCompile(body) {
    const {language, code} = body;
    let result;
    switch (language) {
        case languages[0]:
            try {
                result = await runAndCompileJavascript(code);
            } catch (e) {
                throwCompilationError(e);
            }
            break;
        case languages[1]:
            try {
                result = await runAndCompileC(code);
            } catch (e) {
                throwCompilationError(e);
            }
            break;
        case languages[2]:
            try {
                result = await runAndCompileCPP(code);
            } catch (e) {
                throwCompilationError(e);
            }
            break;

        case languages[3]:
            try {
                result = await runAndCompileJava(code);
            } catch (e) {
                throwCompilationError(e);
            }
            break;
        default:
            throw {
                name: 'Error',
                message: `Unknown language, supported language${languages.length > 1 ? "s are" : " is"} ${languages}`,
                statusCode: 400
            };
    }
    return {message: result};
}

function runAndCompileJavascript(code) {
    code = unescape(code);
    const {node} = require('compile-run');
    return node.runSource(code);
}

function runAndCompileCPP(code) {
    code = unescape(code);
    const {cpp} = require('compile-run');
    return cpp.runSource(code);
}

function runAndCompileC(code) {
    code = unescape(code);
    const {c} = require('compile-run');
    return c.runSource(code);
}

function runAndCompileJava(code) {
    code = unescape(code);
    const {java} = require('compile-run');
    return java.runSource(code);
}

function throwCompilationError(e) {
    throw {
        name: 'Error',
        message: e,
        statusCode: 500
    };
}