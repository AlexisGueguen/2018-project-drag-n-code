import {compilationConstants} from "../_constants/compilation.constants";
import {compilationService} from "../_services/compilation.service";

export const compilationActions = {
    compile
};

function compile(code, level) {
    return dispatch => {
        dispatch(request());
        compilationService.compile(code, level)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: compilationConstants.COMPILATION_REQUEST } }
    function success(result) { return { type: compilationConstants.COMPILATION_SUCCESS, result } }
    function failure(error) { return { type: compilationConstants.COMPILATION_FAILURE, error } }
}