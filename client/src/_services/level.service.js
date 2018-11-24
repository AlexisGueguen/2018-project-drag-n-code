import { authHeader } from '../_helpers';
import configFile from '../config.json';
const config = configFile[process.env.NODE_ENV];

export const levelService = {
    getAll,
    getById
};

function getAll(createdByCommunity) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log(config.apiUrl);
    return fetch(`${config.apiUrl}/levels?isCommunity=${createdByCommunity}`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/levels/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                localStorage.removeItem('user');
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}