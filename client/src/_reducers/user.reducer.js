import {userConstants} from "../_constants";

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {loggedIn: true, user} : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        case userConstants.UPDATE_SUCCESS:
            return {
                user: action.user
            };
        case userConstants.GET_USER_SUCCESS:
            return {
                user: action.user
            };

        default:
            return state
    }
}

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

export function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {registering: true};
        case userConstants.REGISTER_SUCCESS:
            return {};
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}
