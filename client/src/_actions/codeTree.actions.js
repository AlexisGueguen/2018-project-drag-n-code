import {codeTreeConstants} from "../_constants";

export const codeTreeActions = {
    init,
    update
};

function init() {
    return {type: codeTreeConstants.INIT_TREE};
}

function update(tree) {
    return {type: codeTreeConstants.UPDATE_TREE, tree};
}
