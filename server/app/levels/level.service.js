const jwt = require('jsonwebtoken');

const db = require('app/_helpers/db');
const Level = db.Level;

module.exports = {
    getAll,
    getById,
    getByAuthorId,
    create,
    update,
    delete: _delete
};

async function getById(id) {
    let level = await Level.findById(id);
    if (level == null) throw {
        name: 'Error',
        message: `Level ${id} not found`,
        statusCode: 404
    };
    return level;
}

async function getByAuthorId(id) {
    return await Level.find({author: id}, 'title description statement difficulty upVotes');
}

async function getAll(isCommunity) {
    return await Level.find({isCreatedByCommunity: isCommunity}, 'title description statement author difficulty upVotes isCreatedByCommunity');
}

async function create(levelParam, requestToken) {
    if (await Level.findOne({title: levelParam.title})) {
        throw {
            name: 'Error',
            message: `Level ${levelParam.title} already taken`,
            statusCode: 400
        };
    }

    let decoded = jwt.decode(requestToken);
    if(!!decoded) {
        if(decoded.sub.localeCompare(levelParam.author) !== 0) {
            throwForbiddenError();
        }
    }

    const level = new Level(levelParam);

    return await level.save();
}

async function update(levelParam) {
    if (levelParam._id === null || levelParam._id === undefined) throw {
        name: 'Error',
        message: `Object in body is incorrect, provide an _id field.`,
        statusCode: 400
    };
    if (!await Level.findById(levelParam._id)) {
        throw {
            name: 'Error',
            message: `Level ${levelParam.title} not found`,
            statusCode: 404
        };
    }

    let level = new Level(levelParam);

    return await Level.findByIdAndUpdate(levelParam._id, level, {new: true});
}

async function _delete(levelId, requestToken) {
    if (!await Level.findById(levelId)) {
        throw {
            name: 'Error',
            message: `Level ${levelId} not found`,
            statusCode: 404
        };
    }
    await Level.findById(levelId)
        .then((level) => {
            let decoded = jwt.decode(requestToken);
            if(!!decoded) {
                if(decoded.sub.localeCompare(level.author) !== 0) {
                    throwForbiddenError();
                }
            }
        });
    await Level.findByIdAndRemove(levelId);
}

function throwForbiddenError() {
    throw {
        name: 'Forbidden',
        message: `Forbidden Access`,
        statusCode: 403
    };
}