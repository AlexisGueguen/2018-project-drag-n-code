const db = require('app/_helpers/db');
const Level = db.Level;

module.exports = {
    getAll,
    getById,
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

async function getAll() {
    return await Level.find({}, 'title description statement');
}

async function create(levelParam) {
    if (await Level.findOne({title: levelParam.title})) {
        throw {
            name: 'Error',
            message: `Level ${levelParam.title} already taken`,
            statusCode: 400
        };
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

async function _delete(id) {
    if (!await Level.findById(id)) {
        throw {
            name: 'Error',
            message: `Level ${id} not found`,
            statusCode: 404
        };
    }
    await Level.findByIdAndRemove(id);
}