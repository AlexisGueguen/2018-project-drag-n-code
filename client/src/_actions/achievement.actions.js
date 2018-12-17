import {achievementConstants} from "../_constants/achievement.constant";
import {achievementService} from "../_services/achievement.service";
import {alertActions} from "./alert.actions";

export const achievementActions = {
    getAll,
    getById
};

function getAll() {
    return dispatch => {
        dispatch(request());

        achievementService.getAll()
            .then(
                achievements => {
                    dispatch(success(achievements));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() {return {type: achievementConstants.GET_ALL_ACHIEVEMENTS_REQUEST}}
    function success(achievements) {return {type: achievementConstants.GET_ALL_ACHIEVEMENTS_SUCCESS, achievements}}
    function failure(error) {return {type: achievementConstants.GET_ALL_ACHIEVEMENTS_FAILURE, error}}
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        achievementService.getById(id)
            .then(
                achievement => {
                    dispatch(success(achievement));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() {return {type: achievementConstants.GET_ACHIEVEMENT_REQUEST}}
    function success(achievement) {return {type: achievementConstants.GET_ACHIEVEMENT_SUCCESS, achievement}}
    function failure(error) {return {type: achievementConstants.GET_ACHIEVEMENT_FAILURE, error}}
}