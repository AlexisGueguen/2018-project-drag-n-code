import {levelConstants} from "../_constants/level.constant";

export function getAllLevelsByUser(state = {}, action) {
    switch (action.type) {
        case levelConstants.GET_PLAYER_LEVELS_REQUEST:
            return {
                loading: true,
                levels: null
            };
        case levelConstants.GET_PLAYER_LEVELS_SUCCESS:
            return {
                loading: false,
                levels: action.levels
            };
        case levelConstants.GET_PLAYER_LEVELS_FAILURE:
            return {};
        default:
            return state
    }
}