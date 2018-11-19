import {combineReducers} from 'redux';

import {authentication} from './authentication.reducer';
import {registration} from './registration.reducer';
import {alert} from './alert.reducer';
import {getAllLevels} from './getAllLevels.reducer';
import {updateUser} from "./updateUser.reducer";

const rootReducer = combineReducers({
    authentication,
    registration,
    alert,
    getAllLevels,
    updateUser
});

export default rootReducer;