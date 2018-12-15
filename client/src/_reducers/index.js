import {combineReducers} from 'redux';

import {authentication} from './authentication.reducer';
import {registration} from './registration.reducer';
import {alert} from './alert.reducer';
import {getAllLevels} from './getAllLevels.reducer';
import {getAllLevelsByUser} from './getAllLevelsByUser.reducer';
import {updateUser} from "./updateUser.reducer";
import {getLevel} from "./getLevel.reducer";
import {createLevel} from "./createLevel.reducer";
import {getTopUsers} from "./getTopUsers.reducer";
import {code} from "./codeTree.reducer";
import {getAllAchievements} from "./getAllAchievements.reducer";
import {compilation} from "./compilation.reducer";

const rootReducer = combineReducers({
    authentication,
    registration,
    alert,
    getAllLevels,
    getAllLevelsByUser,
    updateUser,
    getLevel,
    createLevel,
    getTopUsers,
    code,
    getAllAchievements,
    compilation
});

export default rootReducer;