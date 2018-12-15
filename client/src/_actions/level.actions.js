import {levelConstants} from "../_constants/level.constant";
import {levelService} from "../_services/level.service";
import {alertActions} from "./alert.actions";
import {history} from "../_helpers";

export const levelActions = {
    getAll,
    getById,
    getByAuthorId,
    create,
    deleteById,
    like
};

function getAll(createdByCommunity) {
    return dispatch => {
        dispatch(request());

        levelService.getAll(createdByCommunity)
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

function getById(id) {
    return dispatch => {
        dispatch(request());

        levelService.getById(id)
            .then(
                level => {
                    dispatch(success(level));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() {return {type: levelConstants.GET_LEVEL_REQUEST}}
    function success(level) {return {type: levelConstants.GET_LEVEL_SUCCESS, level}}
    function failure(error) {return {type: levelConstants.GET_LEVEL_FAILURE, error}}
}

function getByAuthorId(id) {
    return dispatch => {
        dispatch(request());

        levelService.getByAuthorId(id)
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

    function request() {return {type: levelConstants.GET_PLAYER_LEVELS_REQUEST}}
    function success(levels) {return {type: levelConstants.GET_PLAYER_LEVELS_SUCCESS, levels}}
    function failure(error) {return {type: levelConstants.GET_PLAYER_LEVELS_FAILURE, error}}
}

function like(levelId) {
    return dispatch => {
        dispatch(request(levelId));

        levelService.like(levelId)
            .then(
                levelId => {
                    dispatch(success(levelId));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(levelId) { return { type: levelConstants.LIKE_LEVEL_REQUEST, levelId } }
    function success(levelId) { return { type: levelConstants.LIKE_LEVEL_SUCCESS, levelId } }
    function failure(error) { return { type: levelConstants.LIKE_LEVEL_FAILURE, error } }
}

function create(level) {
    return dispatch => {
        dispatch(request(level));

        levelService.create(level)
            .then(
                level => {
                    dispatch(success(level));
                    history.push('/community');
                    dispatch(alertActions.success('Your level was successfully created'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(level) { return { type: levelConstants.CREATE_LEVEL_REQUEST, level } }
    function success(level) { return { type: levelConstants.CREATE_LEVEL_SUCCESS, level } }
    function failure(error) { return { type: levelConstants.CREATE_LEVEL_FAILURE, error } }
}

function deleteById(id) {
    return dispatch => {
        dispatch(request(id));

        levelService.deleteLevel(id)
            .then(
                () => {
                    dispatch(success(id));
                    dispatch(alertActions.success('Your level was successfully deleted'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: levelConstants.DELETE_LEVEL_REQUEST, id } }
    function success(id) { return { type: levelConstants.DELETE_LEVEL_SUCCESS, id } }
    function failure(error) { return { type: levelConstants.DELETE_LEVEL_FAILURE, error } }
}