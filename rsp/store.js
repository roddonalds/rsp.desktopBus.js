
const { JsonDB, Config } = require('node-json-db')

var jsondb = new JsonDB(new Config("rspDesktopBus", true, true));

module.exports = async () => {

    return await jsondb.getData("/");

}
