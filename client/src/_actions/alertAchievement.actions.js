import { achievementAlertConstants } from '../_constants';

export const alertAchievementActions = {
    oneAchievement,
    manyAchievements,
    clear,
};

function oneAchievement(achievement) {
    return { type: achievementAlertConstants.ACH_ONE_SUCCESS, achievement };
}

function manyAchievements(numberOfUnlocked) {
    return { type: achievementAlertConstants.ACH_MANY_SUCCESS, numberOfUnlocked };
}

function clear() {
    return { type: achievementAlertConstants.ACH_CLEAR };
}