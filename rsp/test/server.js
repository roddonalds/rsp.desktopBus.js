const fs = require('fs');
const rspDesktopBus = require('../index.js');

const dbusServer = new rspDesktopBus.Server('io.rsp.appman');

dbusServer.do('GetAllApps', async () => {

  return fs.readdir('/usr/share/applications').forEach(file => {

    return file;

  });

});

dbusServer.job('WatchDatabase', async () => {

  fs.watch('./db.json', async () => {

    const json = await fs.promises.readFile('./db.json');
    const data = JSON.parse(json);

    dbusServer.signal('DatabaseChange', { message: 'Database JSON Changed', data });
  
  })

});

dbusServer.job('KeepSyncing', async () => {

  setInterval(() => {
    
    dbusServer.signal('Syncronize', { message: 'Syncing...', data: { syncronize: true } });
  
  }, 5000)

})

dbusServer.job('TestJobTree', () => {

  setInterval(() => {
  
    dbusServer.signal('TestJobTree', { message: 'TestJobTree', data: { test: true } });
  
  }, 1000);

})