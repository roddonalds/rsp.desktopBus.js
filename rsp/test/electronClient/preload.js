const { contextBridge } = require('electron');

console.log('Running preload.js')

contextBridge.exposeInMainWorld('rsp', {
    dbusClient: () => {
        return require('./main.js').dbusClient;
    }
});