import {codeTreeConstants} from "../_constants/codeTree.constants";
import {initialState} from "../LevelPage/Playground/initialState";

const initialTree = initialState;

export function code(state = {}, action) {
    switch (action.type) {
        case codeTreeConstants.INIT_TREE:
            return initialTree;
        case codeTreeConstants.UPDATE_TREE:
            return {
                tree: action.tree
            };
        default:
            return state
    }
}