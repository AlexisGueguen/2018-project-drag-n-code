import {combineReducers} from 'redux';

import {authentication} from './user.reducer';
import {registration} from './user.reducer';
import {updateUser} from "./user.reducer";
import {getTopUsers} from "./user.reducer";
import {getAllLevels} from './level.reducer';
import {getAllLevelsByUser} from './level.reducer';
import {getLevel} from "./level.reducer";
import {createLevel} from "./level.reducer";
import {code} from "./codeTree.reducer";
import {getAllAchievements} from "./getAllAchievements.reducer";
import {compilation} from "./compilation.reducer";
import {alert, alertAchievements} from './alert.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    updateUser,
    getTopUsers,
    getLevel,
    getAllLevels,
    getAllLevelsByUser,
    createLevel,
    code,
    getAllAchievements,
    compilation,
    alert,
    alertAchievements
});

export default rootReducer;