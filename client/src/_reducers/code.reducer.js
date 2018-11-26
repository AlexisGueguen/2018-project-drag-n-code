import {codeConstants} from "../_constants/code.constants";

export function code(state = {}, action) {
    switch (action.type) {
        case codeConstants.INIT_CODE:
            return {
                code: []
            };
        case codeConstants.ADD_INSTRUCTION:
        case codeConstants.REMOVE_INSTRUCTION:
        case codeConstants.MOVE_INSTRUCTION:
            return {
                code: action.code
            };
        default:
            return state
    }
}