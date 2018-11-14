var mongoose = require('mongoose');

module.exports.connectToDB = function () {
    const databaseUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/dragncode";
    // Connect to MongoDB datastore
    mongoose.connect(databaseUrl, { useNewUrlParser: true }).then(
        () => { console.log(`Connected to ${databaseUrl}`) },
        err => { console.log("err", err); }
    );
};