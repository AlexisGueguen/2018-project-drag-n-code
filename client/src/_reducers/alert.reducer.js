import { alertConstants } from '../_constants';
import { achievementAlertConstants } from "../_constants";

export function alert(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            };
        case alertConstants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
}

export function alertAchievements(state = {}, action) {
    switch (action.type) {
        case achievementAlertConstants.ACH_ONE_SUCCESS:
            return {
                achievement: action.achievement,
                numberOfUnlocked: 1
            };
        case achievementAlertConstants.ACH_MANY_SUCCESS:
            return {
                achievement: null,
                numberOfUnlocked: action.numberOfUnlocked
            };
        case achievementAlertConstants.ACH_CLEAR:
            return {};
        default:
            return state
    }
}