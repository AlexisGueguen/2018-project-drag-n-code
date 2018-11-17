import {levelConstants} from "../_constants/level.constant";

export function getAllLevels(state = {}, action) {
    switch (action.type) {
        case levelConstants.GET_ALL_LEVELS_REQUEST:
            return {
                loading: true,
                levels: null
            };
        case levelConstants.GET_ALL_LEVELS_SUCCESS:
            return {
                loading: false,
                levels: action.levels
            };
        case levelConstants.GET_ALL_LEVELS_FAILURE:
            return {
                loading: false,
                levels: null
            };
        default:
            return state
    }
}