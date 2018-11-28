import {codeConstants} from "../_constants";

export const codeActions = {
    init,
    updateCode
};

function init() {
    return {type: codeConstants.INIT_CODE}
}

function updateCode(action) {
    return action
}
