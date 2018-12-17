import { userConstants } from '../_constants';
import {achievementService, userService} from '../_services';
import { alertActions } from './';
import { alertAchievementActions } from './';
import { history } from '../_helpers';
import _ from 'lodash';


export const userActions = {
    login,
    logout,
    register,
    update,
    getByScore,
    getCurrent,
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    //dispatch(isAchievementUnlocked(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function update(oldUser) {
    return dispatch => {
        dispatch(request({ oldUser }));

        userService.update(oldUser)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(isAchievementUnlocked(user, oldUser));
                    history.push('/profile');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

function getByScore(topNumber) {
    return dispatch => {
        dispatch(request(topNumber));

        userService.getByScore(topNumber)
            .then(
                topUsers => {
                    dispatch(success(topUsers));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(topNumber) { return { type: userConstants.GET_TOP_REQUEST, topNumber } }
    function success(topUsers) { return { type: userConstants.GET_TOP_SUCCESS, topUsers } }
    function failure(error) { return { type: userConstants.GET_TOP_FAILURE, error } }
}

function getCurrent(oldUser) {
    return dispatch => {
        dispatch(request());

        userService.getCurrent()
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(isAchievementUnlocked(user, oldUser));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.GET_USER_REQUEST } }
    function success(user) { return { type: userConstants.GET_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_USER_FAILURE, error } }
}


function isAchievementUnlocked(user, oldUser) {
    return dispatch => {
        if (user.achievements.length !== oldUser.achievements.length) {
            let newAchievements = _.difference(user.achievements, oldUser.achievements);
            if(newAchievements.length === 1) {
                achievementService.getById(newAchievements[0])
                    .then((achievement) => {
                        dispatch(alertAchievementActions.oneAchievement(achievement));
                    })
            }
            else {
                console.log(newAchievements.length);
                dispatch(alertAchievementActions.manyAchievements(newAchievements.length));
            }
        }
    }
}