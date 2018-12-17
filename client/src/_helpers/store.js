import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const loggerMiddleware = createLogger({
    collapsed: true
});

const middlewares = [];

middlewares.push(thunkMiddleware);
if (process.env.NODE_ENV === `development`) {
    middlewares.push(loggerMiddleware);
}

export const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);