import {levelConstants} from "../_constants/level.constant";
import {levelService} from "../_services/level.service";
import {alertActions} from "./alert.actions";

export const levelActions = {
    getAll
};

function getAll() {
    return dispatch => {
        dispatch(request());

        levelService.getAll()
            .then(
                levels => {
                    dispatch(success(levels));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() {return {type: levelConstants.GET_ALL_LEVELS_REQUEST}}
    function success(levels) {return {type: levelConstants.GET_ALL_LEVELS_SUCCESS, levels}}
    function failure(error) {return {type: levelConstants.GET_ALL_LEVELS_FAILURE, error}}
}