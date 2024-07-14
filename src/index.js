const Server = require('./Server.js');
const Client = require('./Client.js');
//var ManagerAPI = require('./ManagerAPI.js');

console.debug('Server.prototype', Server.prototype)

module.exports = {
    Client,
    Server,
//    ManagerAPI
}