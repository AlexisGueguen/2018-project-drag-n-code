import {compilationConstants} from "../_constants/compilation.constants";

export function compilation(state = {}, action) {
    switch (action.type) {
        case compilationConstants.COMPILATION_REQUEST:
            return {
                loading: true
            };
        case compilationConstants.COMPILATION_FAILURE:
            return {};
        case compilationConstants.COMPILATION_SUCCESS:
            return {
                loading: false,
                result: action.result
            };
        default:
            return state
    }
}