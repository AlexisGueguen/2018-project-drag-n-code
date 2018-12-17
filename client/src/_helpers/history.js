import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({
    getUserConfirmation: getUserConfirmation
});

function getUserConfirmation(message, callback) {
    return callback(window.confirm(message));
}

history.listen((location, action) => {

    console.log(action, location.pathname, location.state)
});