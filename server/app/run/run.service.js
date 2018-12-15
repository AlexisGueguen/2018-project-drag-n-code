const axios = require("axios");

module.exports = {
    runAndCompile
};

const languages = ['cpp'];

async function runAndCompile(language, code, level) {
    let compilationResult;
    switch (language) {
        case languages[0]:
            try {
                compilationResult = await runAndCompileCPP(code, level.inputs);
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
    return {
        validated: compilationResult.output === level.outputs,
        input: level.inputs,
        output: compilationResult.output
    };
}

async function runAndCompileCPP(code, inputs) {
    const url = 'https://api.jdoodle.com/execute';
    const compileCode = async url => {
        try {
            const response = await axios.post(url, {
                clientId: '4e4ba155c2a6db8f5cab15a1ed7bd2e1',
                clientSecret: 'b6e9a7d99edadb2b0ec8f0e201a75b82085f16ee0716a93547e92b5b598434f8',
                language: 'cpp14',
                versionIndex: '2',
                stdin: inputs,
                script: code
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw {
                name: 'Compilation error',
                message: error,
                statusCode: 500
            };
        }
    };
    return compileCode(url);
}

function throwCompilationError(e) {
    throw {
        name: 'Error',
        message: e,
        statusCode: 500
    };
}