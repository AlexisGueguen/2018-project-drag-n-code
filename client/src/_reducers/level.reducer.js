import {levelConstants} from "../_constants/level.constant";
import {userConstants} from "../_constants";

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
            return {};
        default:
            return state
    }
}

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

export function createLevel(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { loading: true };
        case userConstants.REGISTER_SUCCESS:
            return {};
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}