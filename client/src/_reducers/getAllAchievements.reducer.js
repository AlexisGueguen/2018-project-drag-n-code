import {achievementConstants} from "../_constants/achievement.constant";

export function getAllAchievements(state = {}, action) {
    switch (action.type) {
        case achievementConstants.GET_ALL_ACHIEVEMENTS_REQUEST:
            return {
                loading: true,
                achievements: null
            };
        case achievementConstants.GET_ALL_ACHIEVEMENTS_SUCCESS:
            return {
                loading: false,
                achievements: action.achievements
            };
        case achievementConstants.GET_ALL_ACHIEVEMENTS_FAILURE:
            return {};
        default:
            return state
    }
}