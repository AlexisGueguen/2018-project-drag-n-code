import {codeTreeConstants} from "../_constants";
import {conversion} from "../LevelPage/treeConversion";
import {initialState} from "../LevelPage/Playground/initialState";

export const codeTreeActions = {
    init,
    update
};

function init() {
    const tree = initialState.tree;
    const code = conversion.toCPP(tree);
    return {type: codeTreeConstants.INIT_TREE, tree, code};
}

function update(tree) {
    const code = conversion.toCPP(tree);
    return {type: codeTreeConstants.UPDATE_TREE, tree, code};
}
