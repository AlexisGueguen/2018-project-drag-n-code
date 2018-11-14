module.exports = {
    login: (req, res, next) => {
        res.send(req.user);
    },
    logout: (req, res) => {
	    req.logout();
	    res.send(null)
    }
}