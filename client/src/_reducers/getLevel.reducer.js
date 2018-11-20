import {levelConstants} from "../_constants/level.constant";

export function getLevel(state = {}, action) {
    switch (action.type) {
        case levelConstants.GET_LEVEL_REQUEST:
            return {
                loading: true,
                level: null
            };
        case levelConstants.GET_LEVEL_SUCCESS:
            return {
                loading: false,
                level: action.level
            };
        case levelConstants.GET_LEVEL_FAILURE:
            return {};
        default:
            return state
    }
}