const user = require('./user')
const auth = require('./authentication')

module.exports = (router) => {
    user(router)
    auth(router)
}