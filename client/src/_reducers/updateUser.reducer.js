import {userConstants} from "../_constants";

export function updateUser(state = {}, action) {
    switch (action.type) {
        case userConstants.UPDATE_REQUEST:
            return {
                updatingData: true,
            };
        case userConstants.UPDATE_SUCCESS:
            return {
                updatingData: false
            };
        case userConstants.UPDATE_FAILURE:
            return {};
        default:
            return state
    }
}