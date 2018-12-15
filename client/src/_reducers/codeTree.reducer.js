import {codeTreeConstants} from "../_constants/codeTree.constants";

export function code(state = {}, action) {
    switch (action.type) {
        case codeTreeConstants.INIT_TREE:
        case codeTreeConstants.UPDATE_TREE:
            return {
                tree: action.tree,
                code: action.code
            };
        default:
            return state
    }
}