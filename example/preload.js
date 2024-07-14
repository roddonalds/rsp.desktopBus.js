const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('rsp', {
    //dsocketClient: () => { }
});