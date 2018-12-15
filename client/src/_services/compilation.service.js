import configFile from "../config";
import {userService} from "./user.service";
import {authBodyHeader} from "../_helpers";
const config = configFile[process.env.NODE_ENV];

export const compilationService = {
    compile
};

function compile(code, level) {
    const requestOptions = {
        method: 'POST',
        headers: authBodyHeader(),
        body: JSON.stringify({
            'language': 'cpp',
            'level': level._id,
            'code': code
        })
    };

    return fetch(`${config.apiUrl}/run`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}