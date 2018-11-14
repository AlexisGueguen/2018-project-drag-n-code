var User = require('./../models/user')
var mongoose = require('mongoose')

module.exports = {
    getCurrentUser: (req, res, next) => {
        if (req.user == null) res.status(403).send({ error: "Please login before." })
        res.send(req.user);
    },
    addUser: (req, res, next) => {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
  
        User.createUser(newUser, function(err, user){
            if(err) throw err;
            res.send(user).end()
        });
    },
    getUser: (req, res, next) => {
        let id = req.params.id
        if (mongoose.Types.ObjectId.isValid(id)) {
            User.findById(id)
                .then((data) => {
                    if (data === null) return res.json({ msg: "User with the id " + id + " not found." })
                    return res.json(data)
                })
                .catch((err) => {
                    return res.json(err)
                })
        } else {
            return res.json({ msg: "Please provide a correct id." })
        }
    }
}