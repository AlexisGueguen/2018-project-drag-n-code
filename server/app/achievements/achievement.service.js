const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('app/_helpers/db');
const Achievement = db.Achievement;

// Interface
module.exports = {
    getById,
    create,
    update,
    getAll,
    _delete
};

async function getById(id) {
    let achvmt = await Achievement.findById(id);
    if (achvmt == null) throw {
        name: 'Error',
        message: `Achievement ${id} not found`,
        statusCode: 404
    };
    return achvmt;
}

async function getAll() {
    return await Achievement.find();
}

async function create(achievementParam) {
    // Check if already exist in db
    if (await Achievement.findOne({ title: achievementParam.title })) {
        throw 'Title "' + achievementParam.title + '" is already taken';
    }

    const achvmt = new Achievement(achievementParam);

    console.log(achvmt);

    // save user
    await achvmt.save();
}

async function update(achievementParam) {
    if (!(!!achievementParam._id)) throw {
        name: 'Error',
        message: `Object in body is incorrect, provide an _id field.`,
        statusCode: 400
    };
    if (!await Achievement.findById(achievementParam._id)) {
        throw {
            name: 'Error',
            message: `Achievement ${achievementParam._id} not found`,
            statusCode: 404
        };
    }

    let achvmt = new Achievement(achievementParam);
    return await Achievement.findByIdAndUpdate(achievementParam._id, achvmt, {new: true});
}

async function _delete(id) {
    if (!await Achievement.findById(id)) {
        throw {
            name: 'Error',
            message: `Achievement ${id} not found`,
            statusCode: 404
        };
    }
    await Achievement.findByIdAndRemove(id);
}