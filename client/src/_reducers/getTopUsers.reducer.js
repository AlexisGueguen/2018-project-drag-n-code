import {userConstants} from "../_constants";

export function getTopUsers(state = {}, action) {
    switch (action.type) {
        case userConstants.GET_TOP_REQUEST:
            return {
                loading: true,
                topUsers: null
            };
        case userConstants.GET_TOP_SUCCESS:
            return {
                loading: false,
                topUsers: action.topUsers
            };
        case userConstants.GET_TOP_FAILURE:
            return {};
        default:
            return state
    }
}