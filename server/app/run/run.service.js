module.exports = {
    runAndCompile
};

const languages = ['javascript', 'c++'];

async function runAndCompile(body) {
    const {language, code} = body;
    let result;
    switch (language) {
        case languages[0]:
            await runAndCompileJavascript(code)
                .then(result => {
                    console.log(result);
                    return result;
                })
                .catch(err => {
                    console.log(err);
                });
            break;
        case languages[1]:
            await runAndCompileCPP(code)
                .then(result => {
                    console.log(result);
                    return result;
                })
                .catch(err => {
                    console.log(err);
                });
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
    const {node} = require('compile-run');
    return node.runSource(code);
}

function runAndCompileCPP(code) {
    code = unescape(code);
    const {cpp} = require('compile-run');
    return cpp.runSource(code);
}