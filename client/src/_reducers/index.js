import {combineReducers} from 'redux';

import {authentication} from './authentication.reducer';
import {registration} from './registration.reducer';
import {alert} from './alert.reducer';
import {getAllLevels} from './getAllLevels.reducer';
import {updateUser} from "./updateUser.reducer";
import {getLevel} from "./getLevel.reducer";
import {createLevel} from "./createLevel.reducer";
import {getTopUsers} from "./getTopUsers.reducer";
import {code} from "./code.reducer";

const rootReducer = combineReducers({
    authentication,
    registration,
    alert,
    getAllLevels,
    updateUser,
    getLevel,
    createLevel,
    getTopUsers,
    code
});

export default rootReducer;