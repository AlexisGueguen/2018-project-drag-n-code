import {codeConstants} from "../_constants/code.constants";
import {instructions} from "../LevelPage/Playground/Instructions/instructions";

export const codeInitialState = {
    code: [
        {
            id: "code-root",
            type: instructions.Root,
            attributes: {},
            children: []
        }
    ]
};

export function code(state = {}, action) {
    switch (action.type) {
        case codeConstants.INIT_CODE:
            return codeInitialState;
        case codeConstants.ADD_INSTRUCTION:
        case codeConstants.REMOVE_INSTRUCTION:
        case codeConstants.UPDATE_INSTRUCTION:
        case codeConstants.COMBINE_INSTRUCTION:
        case codeConstants.MOVE_INSTRUCTION:
            return {
                code: action.code
            };
        default:
            return state
    }
}