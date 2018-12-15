const config = require('../../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('app/_helpers/db');
const User = db.User;
const Level = db.Level;

// Interface
module.exports = {
    login,
    getById,
    create,
    update,
    getByScore,
    likeLevel
};

async function login({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        // Split the user object
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getById(id, requestToken) {
    if(await checkTokenUser(id, requestToken)!== 0 && !!requestToken) {
        throw {
            name: 'Forbidden',
            message: `Forbidden Access`,
            statusCode: 403
        };
    }

    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // Check if already exist in db
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    userParam.score = 0;
    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(userParam, requestToken) {
    if (!(!!userParam._id)) throw {
        name: 'Error',
        message: `Object in body is incorrect, provide an _id field.`,
        statusCode: 400
    };
    if (!await User.findById(userParam._id)) {
        throw {
            name: 'Error',
            message: `User ${userParam.username} not found`,
            statusCode: 404
        };
    }
    if(await checkTokenUser(userParam._id, requestToken)!== 0 && !!requestToken)
        throw {
            name: 'Forbidden',
            message: `Forbidden Access`,
            statusCode: 403
        };

    let user = new User(userParam);

    return await User.findByIdAndUpdate(userParam._id, user, {new: true});
}

async function getByScore(topNumber) {
    let limitNumber = Number(topNumber);
    if (!limitNumber) throw {
        name: 'Error',
        message: `Object in query is incorrect, provide a valid number.`,
        statusCode: 400
    };

    return await User
        .find({}, 'username picture score')
        .sort({score : -1})
        .limit(limitNumber)
}

async function likeLevel(body, requestToken) {
    let foundUser = await User.findById(body.userId);
    let foundLevel = await Level.findById(body.levelId);
    if (!(!!body.levelId)) throw {
        name: 'Error',
        message: `Object in body is incorrect, provide a levelId field.`,
        statusCode: 400
    };
    if (!(!!body.userId)) throw {
        name: 'Error',
        message: `Object in body is incorrect, provide a userId field.`,
        statusCode: 400
    };
    if (!foundUser ) {
        throw {
            name: 'Error',
            message: `User not found`,
            statusCode: 404
        };
    }
    if (!foundLevel ) {
        throw {
            name: 'Error',
            message: `User not found`,
            statusCode: 404
        };
    }
    if(await checkTokenUser(body.userId, requestToken)!== 0 && !!requestToken)
        throw {
            name: 'Forbidden',
            message: `Forbidden Access`,
            statusCode: 403
        };

    if((foundUser.likes).includes(body.levelId)) {
        foundLevel.upVotes --;
        (foundUser.likes).splice(foundUser.likes.indexOf(body.levelId), 1);
    }
    else {
        foundLevel.upVotes ++;
        await foundUser.likes.push(body.levelId);
    }

    await Level.findByIdAndUpdate(body.levelId, foundLevel);
    return await User.findByIdAndUpdate(body.userId, foundUser, {new: true});
}

async function checkTokenUser(ownerId, requestToken) {
    let decoded = jwt.decode(requestToken);
    if(!!decoded) {
        return decoded.sub.localeCompare(ownerId);
    }
    else return -1;
}